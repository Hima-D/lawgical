'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have a UI library

export default function DocumentUploadForm() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('description', description);
    formData.append('uploaderId', 1); // Example user ID, replace with actual logged-in user ID
    formData.append('appointmentId', 1); // Example appointment ID, replace if needed

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Document uploaded successfully');
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        name="document"
        onChange={handleFileChange}
        required
      />
      <textarea
        name="description"
        placeholder="Enter description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </form>
  );
}
