// lib/resend.js
import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a welcome email to newly registered users
 * @param {string} userEmail - User's email address
 * @param {string} displayName - User's display name
 * @param {string} userType - User type (client, lawyer, etc.)
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const sendWelcomeEmail = async (userEmail, displayName, userType) => {
  // Validate required parameters
  if (!userEmail) {
    return { success: false, error: 'Email address is required' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.APP_NAME || 'Your App'} <${process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com'}>`,
      to: [userEmail],
      subject: `Welcome to ${process.env.APP_NAME || 'Our Platform'}! 🎉`,
      html: createWelcomeEmailHTML(displayName, userType, userEmail),
      text: createWelcomeEmailText(displayName, userType, userEmail),
      // Optional: Add tags for tracking
      tags: [
        { name: 'category', value: 'welcome' },
        { name: 'user_type', value: userType }
      ],
    });

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }

    console.log('Welcome email sent successfully:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      error: error.message || 'Unexpected error occurred while sending email' 
    };
  }
};

/**
 * Create HTML version of welcome email
 */
const createWelcomeEmailHTML = (displayName, userType, userEmail) => {
  const appName = process.env.APP_NAME || 'Your App';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@yourdomain.com';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ${appName}</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #000 0%, #333 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 600;
          }
          .content { 
            padding: 30px 20px; 
            background: #ffffff; 
          }
          .welcome-message {
            font-size: 18px;
            color: #2c3e50;
            margin-bottom: 20px;
          }
          .user-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #000;
          }
          .features-list {
            background: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .features-list h3 {
            margin-top: 0;
            color: #2c3e50;
          }
          .features-list ul {
            padding-left: 20px;
            margin-bottom: 0;
          }
          .features-list li {
            margin-bottom: 8px;
            color: #555;
          }
          .cta-button { 
            display: inline-block; 
            background: linear-gradient(135deg, #000 0%, #333 100%); 
            color: white !important; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer { 
            text-align: center; 
            padding: 30px 20px; 
            background-color: #f8f9fa;
            border-top: 1px solid #e9ecef;
            font-size: 14px; 
            color: #6c757d; 
          }
          .footer a {
            color: #000;
            text-decoration: none;
          }
          .divider {
            height: 2px;
            background: linear-gradient(to right, #000, #333, #000);
            margin: 20px 0;
            border: none;
          }
          @media (max-width: 600px) {
            .email-container { margin: 10px; }
            .header, .content, .footer { padding: 20px 15px; }
            .header h1 { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Welcome to ${appName}! 🎉</h1>
          </div>
          
          <div class="content">
            <div class="welcome-message">
              <strong>Hello ${displayName || 'there'}! 👋</strong>
            </div>
            
            <p>Thank you for joining our platform! Your account has been successfully created.</p>
            
            <div class="user-info">
              <h3>📋 Account Details</h3>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>Account Type:</strong> ${userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
              <p><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">Active ✅</span></p>
            </div>

            <div class="features-list">
              <h3>🚀 What's Next?</h3>
              <ul>
                <li>Complete your profile to get personalized recommendations</li>
                <li>Explore our platform features and tools</li>
                <li>Connect with ${userType === 'client' ? 'experienced lawyers' : 'potential clients'}</li>
                <li>Access our comprehensive resource library</li>
                <li>Join our community discussions and forums</li>
              </ul>
            </div>

            <hr class="divider">
            
            <div style="text-align: center;">
              <a href="${appUrl}/signin" class="cta-button">
                🔐 Access Your Account
              </a>
            </div>
            
            <hr class="divider">
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0; color: #1565c0;">
                <strong>💡 Need Help?</strong> Our support team is here to assist you. 
                Reply to this email or contact us at 
                <a href="mailto:${supportEmail}" style="color: #1565c0;">${supportEmail}</a>
              </p>
            </div>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>The ${appName} Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            <p>
              <a href="${appUrl}/unsubscribe">Unsubscribe</a> | 
              <a href="${appUrl}/privacy">Privacy Policy</a> | 
              <a href="${appUrl}/terms">Terms of Service</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px;">
              This email was sent to ${userEmail} because you created an account on our platform.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Create plain text version of welcome email
 */
const createWelcomeEmailText = (displayName, userType, userEmail) => {
  const appName = process.env.APP_NAME || 'Your App';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@yourdomain.com';

  return `
Welcome to ${appName}!

Hello ${displayName || 'there'}!

Thank you for joining our platform! Your account has been successfully created.

ACCOUNT DETAILS:
- Email: ${userEmail}
- Account Type: ${userType.charAt(0).toUpperCase() + userType.slice(1)}
- Status: Active ✅

WHAT'S NEXT?
• Complete your profile to get personalized recommendations
• Explore our platform features and tools
• Connect with ${userType === 'client' ? 'experienced lawyers' : 'potential clients'}
• Access our comprehensive resource library
• Join our community discussions and forums

ACCESS YOUR ACCOUNT:
${appUrl}/signin

NEED HELP?
Our support team is here to assist you. Reply to this email or contact us at ${supportEmail}

Best regards,
The ${appName} Team

---
© ${new Date().getFullYear()} ${appName}. All rights reserved.
Unsubscribe: ${appUrl}/unsubscribe
Privacy Policy: ${appUrl}/privacy
Terms of Service: ${appUrl}/terms

This email was sent to ${userEmail} because you created an account on our platform.
  `.trim();
};

/**
 * Send email verification email (for future use)
 */
export const sendVerificationEmail = async (userEmail, verificationToken) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.APP_NAME || 'Your App'} <${process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com'}>`,
      to: [userEmail],
      subject: 'Verify Your Email Address',
      html: `
        <h2>Email Verification Required</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${appUrl}/verify-email?token=${verificationToken}" 
           style="background: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Verify Email Address
        </a>
        <p>This link will expire in 24 hours.</p>
      `,
      tags: [{ name: 'category', value: 'verification' }],
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};