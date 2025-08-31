import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure Nodemailer transport (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g., your-email@gmail.com)
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Validate email format
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Validate phone number (10-15 digits, optional +)
const isValidPhone = (phone) => /^\+?\d{10,15}$/.test(phone.replace(/[\s-]/g, ""));

export async function POST(request) {
  try {
    // Parse request body
    const data = await request.json();
    const {
      fullName,
      email,
      phone,
      organization,
      jobTitle,
      country,
      referralSource,
      batchPreference,
      termsAccepted,
    } = data;

    // Server-side validation
    const errors = {};
    if (!fullName?.trim()) errors.fullName = "Full name is required";
    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }
    if (!phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(phone)) {
      errors.phone = "Invalid phone number (10-15 digits)";
    }
    if (!jobTitle?.trim()) errors.jobTitle = "Job title is required";
    if (!country?.trim()) errors.country = "Country is required";
    if (!batchPreference?.trim()) errors.batchPreference = "Batch preference is required";
    if (!termsAccepted) errors.termsAccepted = "You must accept the terms and conditions";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Validation failed", errors }, { status: 400 });
    }

    // Simulate database check for duplicate email (replace with actual database logic)
    if (email === "test@example.com") {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Prepare email content
    const mailOptions = {
      from: `"lawgical POSH Training" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "POSH Trainer Certification Registration Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e40af;">Thank You for Registering!</h2>
          <p>Dear ${fullName},</p>
          <p>We have successfully received your registration for the POSH Trainer Certification program. Below are your registration details:</p>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Full Name:</strong> ${fullName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Organization:</strong> ${organization || "N/A"}</li>
            <li><strong>Job Title:</strong> ${jobTitle}</li>
            <li><strong>Country:</strong> ${country}</li>
            <li><strong>How You Heard About Us:</strong> ${referralSource || "N/A"}</li>
            <li><strong>Batch Preference:</strong> ${batchPreference}</li>
          </ul>
          <p>We will contact you soon with further details about the program and next steps.</p>
          <p>Best regards,<br />The POSH Training Pro Team</p>
          <p style="font-size: 12px; color: #6b7280;">If you did not register, please contact us at support@lawgical.io.</p>
        </div>
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { message: "Registration successful, but email sending failed. We'll contact you soon." },
        { status: 200 }
      );
    }

    // Simulate saving to database (replace with actual database logic)
    console.log("Registration data:", data);

    return NextResponse.json(
      { message: "Registration successful! A confirmation email has been sent to your email address." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
