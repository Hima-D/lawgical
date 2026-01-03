'use client';

import { useEffect, useState } from 'react';
import DocumentEditor from '@/components/DocumentEditor/DocumentEditor';
import { Loader2, AlertCircle } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function DocumentPage() {
  const router = useRouter();
  const params = useParams();
  const docId = params.docId;

  const [authChecked, setAuthChecked] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) {
        router.replace('/signin');
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!docId || docId === 'undefined') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-800">Invalid Document ID</p>
          <p className="text-gray-600 mt-2">Please select a valid document.</p>
        </div>
      </div>
    );
  }

  return <DocumentEditor docId={docId} />;
}