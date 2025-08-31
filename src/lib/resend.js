// lib/brevo.js
/**
 * Send a welcome email to newly registered users using Brevo
 * @param {string} userEmail - User's email address
 * @param {string} displayName - User's display name
 * @param {string} userType - User type (client, lawyer, etc.)
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const sendWelcomeEmail = async (userEmail, displayName, userType) => {
  if (!userEmail) {
    return { success: false, error: "Email address is required" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_FROM_EMAIL || "welcome@yourdomain.com",
          name: process.env.APP_NAME || "Legal Platform"
        },
        to: [{ email: userEmail, name: displayName }],
        subject: `Account Created - Welcome to ${process.env.APP_NAME || "Our Platform"}`,
        htmlContent: createWelcomeEmailHTML(displayName, userType, userEmail),
        textContent: createWelcomeEmailText(displayName, userType, userEmail),
        tags: ["welcome", "onboarding", userType],
        // Add these anti-spam configurations
        headers: {
          "List-Unsubscribe": `<${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe>`,
          "X-Entity-Ref-ID": "welcome-email"
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API error:", data);
      return { success: false, error: data.message || "Failed to send email" };
    }

    console.log("Welcome email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: error.message || "Unexpected error occurred while sending email",
    };
  }
};

/**
 * Create HTML version of welcome email
 */
const createWelcomeEmailHTML = (displayName, userType, userEmail) => {
  const appName = process.env.APP_NAME || "Legal Platform";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const supportEmail = process.env.SUPPORT_EMAIL || "support@yourdomain.com";
  const companyAddress = process.env.COMPANY_ADDRESS || "123 Business Ave, City, State 12345";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${appName}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin-bottom: 20px; font-size: 28px;">Welcome to ${appName}</h1>
        
        <p style="font-size: 16px; margin-bottom: 15px;">Dear ${displayName || "Valued User"},</p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for creating your account with ${appName}. We are pleased to confirm that your registration has been completed successfully.
        </p>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border-left: 4px solid #3498db; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 18px;">Account Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px;">Email Address:</td>
                    <td style="padding: 8px 0;">${userEmail}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Account Type:</td>
                    <td style="padding: 8px 0; text-transform: capitalize;">${userType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Status:</td>
                    <td style="padding: 8px 0; color: #27ae60;">Active</td>
                </tr>
            </table>
        </div>

        <h3 style="color: #2c3e50; font-size: 18px; margin-top: 25px;">Getting Started</h3>
        <ul style="font-size: 16px; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Complete your profile to enhance your experience</li>
            <li style="margin-bottom: 8px;">Explore our comprehensive platform features</li>
            <li style="margin-bottom: 8px;">Connect with verified ${userType === "client" ? "legal professionals" : "clients"}</li>
            <li style="margin-bottom: 8px;">Review our terms of service and privacy policy</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/signin" 
               style="display: inline-block; background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Access Your Account
            </a>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0; font-size: 16px;">Need Assistance?</h3>
            <p style="margin-bottom: 10px; font-size: 14px;">
                Our support team is available to help you with any questions or concerns.
            </p>
            <p style="margin-bottom: 0; font-size: 14px;">
                Contact us at: <a href="mailto:${supportEmail}" style="color: #3498db;">${supportEmail}</a>
            </p>
        </div>

        <p style="font-size: 16px; margin-top: 25px;">
            Best regards,<br>
            The ${appName} Team
        </p>
    </div>

    <footer style="text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #e0e0e0;">
        <p style="margin-bottom: 10px;">${appName}</p>
        <p style="margin-bottom: 10px;">${companyAddress}</p>
        <p style="margin-bottom: 0;">
            <a href="${appUrl}/unsubscribe" style="color: #666;">Unsubscribe</a> | 
            <a href="${appUrl}/privacy" style="color: #666;">Privacy Policy</a> | 
            <a href="${appUrl}/terms" style="color: #666;">Terms of Service</a>
        </p>
    </footer>
</body>
</html>
  `.trim();
};

/**
 * Create plain text version of welcome email
 */
const createWelcomeEmailText = (displayName, userType, userEmail) => {
  const appName = process.env.APP_NAME || "Legal Platform";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const supportEmail = process.env.SUPPORT_EMAIL || "support@yourdomain.com";
  const companyAddress = process.env.COMPANY_ADDRESS || "123 Business Ave, City, State 12345";

  return `
Welcome to ${appName}

Dear ${displayName || "Valued User"},

Thank you for creating your account with ${appName}. We are pleased to confirm that your registration has been completed successfully.

ACCOUNT INFORMATION
===================
Email Address: ${userEmail}
Account Type: ${userType}
Status: Active

GETTING STARTED
===============
- Complete your profile to enhance your experience
- Explore our comprehensive platform features  
- Connect with verified ${userType === "client" ? "legal professionals" : "clients"}
- Review our terms of service and privacy policy

Access your account: ${appUrl}/signin

NEED ASSISTANCE?
================
Our support team is available to help you with any questions or concerns.
Contact us at: ${supportEmail}

Best regards,
The ${appName} Team

---
${appName}
${companyAddress}

Unsubscribe: ${appUrl}/unsubscribe
Privacy Policy: ${appUrl}/privacy
Terms of Service: ${appUrl}/terms
  `.trim();
};