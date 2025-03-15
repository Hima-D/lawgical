import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse the request body
    const formData = await req.json();
    const { name, email, mobile, message } = formData;

    // Validate incoming data (you can add more validation if needed)
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'All fields are required.' }),
        { status: 400 }
      );
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can change this to your email service
      auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS, // Replace with your email password (use app password for Gmail)
      },
    });

    // Setup the email options
    const mailOptions = {
      from: `"Lawgical" <${process.env.EMAIL_USER}>`,  // Sender name as 'Lawgical' and email ID same
      to: 'chahatsiwach07@gmail.com',  // Change recipient to chahatsiwach07@gmail.com
      subject: 'New Contact Form Submission',  // Subject line
      text: `
        Dear Chahat,

        You have received a new message through your contact form:

        Name: ${name}
        Email: ${email}
        
        Message:
        "${message}"

        Please take a moment to review the details and get back to the sender at their provided email address.

        Best regards,
        Lawgical Team
      `, // More professional message body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Email sent successfully', info }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ message: 'Error sending email', error: error.message }),
      { status: 500 }
    );
  }
}
