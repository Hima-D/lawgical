const onSubmit = async (data) => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      templateName: 'nda',
      fields: data,
    }),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'custom-document.docx';
  a.click();
};
