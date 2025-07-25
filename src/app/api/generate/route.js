// // /app/api/generate/route.ts
// import { NextResponse } from 'next/server';
// import { parseTemplate } from '@/lib/templateParser';

// export async function POST(req: Request) {
//   const data = await req.json();
//   const { templateName, fields } = data;

//   const buffer = await parseTemplate(templateName, fields);

//   return new NextResponse(buffer, {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'Content-Disposition': `attachment; filename="${templateName}.docx"`,
//     },
//   });
// }
