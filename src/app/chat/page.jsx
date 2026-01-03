'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Upload,
  Send,
  Bot,
  FileText,
  X,
  Loader2,
  Paperclip,
  LogOut,
  User,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadAIChat() {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [redirectMessage, setRedirectMessage] = useState('');

  // Chat & AI state
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const AI_API_URL = 'https://your-ai-server.com/api/analyze';

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setRedirectMessage('You need to sign in to use the AI Document Agent.');
          setTimeout(() => router.replace('/signin'), 2000);
        }
      } catch (e) {
        setRedirectMessage('Checking your session...');
        setTimeout(() => router.replace('/signin'), 2000);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Logout
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setRedirectMessage('See you soon! Redirecting to sign in...');
    setTimeout(() => router.replace('/signin'), 1500);
  };

  // File handlers
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError('');
      addMessage('user', `Uploaded: ${f.name}`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setError('');
      addMessage('user', `Uploaded: ${f.name}`);
    }
  };

  const addMessage = (role, content) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { id: Date.now(), role, content, timestamp }]);
  };

  const clearAll = () => {
    setFile(null);
    setMessage('');
    setMessages([]);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit to AI
  const handleSubmit = async () => {
    if (!file && !message.trim()) {
      setError('Please upload a file or type a message');
      return;
    }

    const userMessage = message.trim() || `Analyze the uploaded document.`;
    addMessage('user', userMessage);

    setIsLoading(true);
    setError('');
    setMessage('');

    const form = new FormData();
    if (file) form.append('file', file);
    if (userMessage) form.append('message', userMessage);

    try {
      const res = await fetch(AI_API_URL, {
        method: 'POST',
        body: form,
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to reach AI server');

      const data = await res.json();
      const aiResponse = data.response || data.result || 'No response from AI.';
      addMessage('assistant', aiResponse);
    } catch (err) {
      addMessage('assistant', `Error: ${err.message || 'Something went wrong'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading screen
  if (authLoading || redirectMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-800">
            {redirectMessage || 'Verifying your session...'}
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Document Agent</h1>
              <p className="text-sm text-gray-600">
                Hello, <span className="font-medium">{user?.displayName || user?.email}</span>
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">How can I help you today?</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Upload a document or ask a legal question. I’ll analyze and respond instantly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                            : 'bg-gradient-to-r from-purple-500 to-pink-600'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                    </div>
                    <div
                      className={`rounded-2xl px-5 py-3 max-w-xs lg:max-w-md ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-5 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
          {/* File Upload */}
          <div className="mb-4">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-indigo-500 transition bg-gray-50"
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                {file ? `Selected: ${file.name}` : 'Drop file here or click to upload'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX, PNG, JPG • Max 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {file && (
              <div className="mt-2 flex items-center justify-between bg-indigo-50 px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-indigo-600" />
                  <span className="text-indigo-800 font-medium">{file.name}</span>
                  <span className="text-indigo-600">• {(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Text Input */}
          <div className="flex gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Ask about the document or type your question..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={!file && !message.trim() || isLoading}
              className="self-end bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 text-sm text-red-600 text-center font-medium">{error}</p>
          )}

          {/* Footer */}
          <p className="mt-4 text-xs text-center text-gray-500">
            This AI provides general guidance. For legal matters, consult a qualified attorney.
          </p>
        </div>
      </div>
    </div>
  );
}