'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import {
  Loader2,
  Save,
  History,
  Bot,
  Sparkles,
  X,
  AlertCircle,
} from 'lucide-react';
import debounce from 'lodash/debounce';

// Dynamic import Quill → no SSR
const Quill = dynamic(() => import('quill'), { ssr: false });

export default function DocumentEditor({ docId }) {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [title, setTitle] = useState('Untitled Document');
  const [suggestions, setSuggestions] = useState([]);
  const [versions, setVersions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize Quill
  useEffect(() => {
    if (!editorRef.current || typeof window === 'undefined') return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
      placeholder: 'Start drafting your legal document…',
    });

    quillRef.current = quill;

    // Load initial content
    loadLatestVersion(quill);

    // Debounced AI + save
    const handleChange = debounce(() => {
      const delta = quill.getContents();
      fetchAISuggestions(delta);
      autoSave(delta);
    }, 1200);

    quill.on('text-change', handleChange);

    return () => quill.off('text-change', handleChange);
  }, [docId]);

  // Load latest version
  const loadLatestVersion = async (quill) => {
    try {
      const res = await fetch(`/api/docs/latest/${docId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load document');
      const data = await res.json();
      const content = data.content ? JSON.parse(data.content) : '';
      quill.setContents(content);
      setTitle(data.title || 'Untitled Document');
    } catch (e) {
      setError('Could not load document. Starting fresh.');
    } finally {
      setIsLoading(false);
    }
  };

  // AI suggestions
  const fetchAISuggestions = async (delta) => {
    try {
      const res = await fetch('/api/ai-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, content: JSON.stringify(delta) }),
        credentials: 'include',
      });
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Auto-save
  const autoSave = async (delta) => {
    setIsSaving(true);
    try {
      await fetch('/api/docs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docId,
          title,
          content: JSON.stringify(delta),
        }),
        credentials: 'include',
      });
      fetchVersions();
    } catch (e) {
      setError('Auto-save failed');
    } finally {
      setIsSaving(false);
    }
  };

  // Load versions
  const fetchVersions = useCallback(async () => {
    try {
      const res = await fetch(`/api/docs/versions/${docId}`, { credentials: 'include' });
      const data = await res.json();
      setVersions(data.versions || []);
    } catch (e) {
      console.error(e);
    }
  }, [docId]);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  // Restore version
  const restore = (content) => {
    quillRef.current.setContents(JSON.parse(content));
    autoSave(JSON.parse(content));
  };

  // Apply suggestion
  const applySuggestion = (text) => {
    const range = quillRef.current.getSelection(true);
    quillRef.current.insertText(range.index, `\n${text}\n`, 'user');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Editor */}
      <div className="flex-1 flex flex-col p-6">
        <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col overflow-hidden">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mx-6 mt-6 text-2xl font-bold border-b pb-2 focus:outline-none focus:border-indigo-500"
            placeholder="Document title"
          />

          {/* Quill Editor */}
          <div ref={editorRef} className="flex-1 mx-6 mt-4 mb-6" />

          {/* Save Status */}
          <div className="mx-6 mb-4 flex items-center text-sm">
            {isSaving ? (
              <span className="flex items-center text-yellow-600">
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center text-green-600">
                <Save className="h-4 w-4 mr-1" />
                Saved
              </span>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 bg-white border-l p-6 overflow-y-auto">
        {/* AI Suggestions */}
        <div className="mb-8">
          <h3 className="flex items-center font-semibold text-lg mb-3">
            <Bot className="h-5 w-5 mr-2 text-purple-600" />
            AI Clause Suggestions
          </h3>
          {suggestions.length > 0 ? (
            <ul className="space-y-2">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="p-3 bg-purple-50 rounded-lg text-sm border border-purple-100 flex justify-between items-start"
                >
                  <span className="flex-1 pr-2">{s}</span>
                  <button
                    onClick={() => applySuggestion(s)}
                    className="text-xs text-purple-700 hover:underline font-medium"
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Start typing to get AI-powered clause suggestions.
            </p>
          )}
        </div>

        {/* Version History */}
        <div>
          <h3 className="flex items-center font-semibold text-lg mb-3">
            <History className="h-5 w-5 mr-2 text-indigo-600" />
            Version History
          </h3>
          {versions.length > 0 ? (
            <ul className="space-y-2">
              {versions.map((v) => (
                <li
                  key={v.id}
                  className="p-2 bg-indigo-50 rounded flex justify-between items-center text-xs border border-indigo-100"
                >
                  <span className="truncate max-w-[140px]">
                    {new Date(v.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => restore(v.content)}
                    className="text-indigo-700 hover:underline font-medium"
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No saved versions yet.</p>
          )}
        </div>
      </aside>
    </div>
  );
}