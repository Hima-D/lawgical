import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function parseTemplate(templateName: string, fields: Record<string, string>) {
  const templatePath = path.join(process.cwd(), 'documents', 'templates', `${templateName}.docx`);
  const content = fs.readFileSync(templatePath, 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  doc.setData(fields);

  try {
    doc.render();
  } catch (error) {
    throw new Error('Document rendering failed');
  }

  const buffer = doc.getZip().generate({ type: 'nodebuffer' });
  return buffer;
}
