// src/app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse form data
    const formData = await req.json();
    const { name, email, mobile, message } = formData;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    // =============================
    // 1. Send Email via Nodemailer
    // =============================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Lawgical" <${process.env.EMAIL_USER}>`,
      to: "support@lawgical.tech",
      subject: "New Contact Form Submission",
      text: `
        Dear Team,

        You have received a new message through your contact form:

        Name: ${name}
        Email: ${email}
        Mobile: ${mobile || "Not provided"}
        
        Message:
        "${message}"

        Regards,
        Lawgical Website
      `,
    });

    // =============================
    // 2. Send Data to HubSpot
    // =============================

    // Use upsert endpoint by email
    const hubspotResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(
        email
      )}?idProperty=email`,
      {
        method: "PATCH", // PATCH = update or create if not exists
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
            email: email,
            firstname: name,
            phone: mobile,
            
          },
        }),
      }
    );

    const hubspotData = await hubspotResponse.json();

    if (!hubspotResponse.ok) {
      console.error("HubSpot Error:", hubspotData);
      throw new Error(hubspotData.message || "HubSpot API error");
    }

    // =============================
    // SUCCESS
    // =============================
    return new Response(
      JSON.stringify({
        message: "Email sent + HubSpot entry successful",
        hubspotId: hubspotData.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Error", error: error.message }),
      { status: 500 }
    );
  }
}
