// pages/api/careers/apply.js (if using Pages Router)
// OR
// app/api/careers/apply/route.js (if using App Router)

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';

// Disable body parser for form data with files
export const config = {
  api: {
    bodyParser: false,
  },
};

// For App Router
export async function POST(request) {
  const formData = await request.formData();
  
  try {
    // Extract form fields
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const department = formData.get('department');
    const resumeFile = formData.get('resume');
    
    // Validate required fields
    if (!name || !email || !phone || !department || !resumeFile) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save file to storage (cloud or local)
    // 2. Store application data in database
    // 3. Send confirmation emails, etc.

    // Simulate successful processing
    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        data: { applicationId: uuidv4() }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process application' },
      { status: 500 }
    );
  }
}

// For Pages Router (if you're using the older Next.js pages structure)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Parse form with formidable
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        res.status(500).json({ success: false, message: 'Failed to process application' });
        return resolve();
      }

      try {
        // Extract form fields
        const { name, email, phone, department } = fields;
        const resumeFile = files.resume;

        // Validate required fields
        if (!name || !email || !phone || !department || !resumeFile) {
          res.status(400).json({ success: false, message: 'All fields are required' });
          return resolve();
        }

        // In a real application, you would:
        // 1. Save file to storage (cloud or local)
        // 2. Store application data in database
        // 3. Send confirmation emails, etc.

        // Simulate successful processing
        res.status(200).json({ 
          success: true, 
          message: 'Application submitted successfully',
          data: { applicationId: uuidv4() }
        });
        
        resolve();
      } catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ success: false, message: 'Failed to process application' });
        resolve();
      }
    });
  });
}