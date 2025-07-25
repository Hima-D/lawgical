import React from 'react';

const DocumentBuilderPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Document Builder</h1>
      <p>Welcome to the Document Builder page. Use the tools below to create and customize your documents.</p>
      
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>
          Add Section
        </button>
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Preview Document
        </button>
      </div>

      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
        <h2>Document Preview</h2>
        <p>Your document content will appear here...</p>
      </div>
    </div>
  );
};

export default DocumentBuilderPage;