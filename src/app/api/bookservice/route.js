import twilio from 'twilio';

// Retrieve Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio WhatsApp-enabled number

// Initialize Twilio client
const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    // Parse the request body as JSON
    const data = await req.json();
    
    const { service, attorney, date, time, name, email, phone, description } = data;

    // Validate required fields
    const requiredFields = { service, attorney, date, time, name, email, phone, description };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.toString().trim() === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate and format phone number
    let formattedPhone = phone;
    
    // Check if phone already has whatsapp: prefix
    if (!phone.startsWith('whatsapp:')) {
      return new Response(
        JSON.stringify({ 
          error: 'Phone number must be in WhatsApp format: whatsapp:+[CountryCode][PhoneNumber]' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate WhatsApp phone format
    const whatsappRegex = /^whatsapp:\+?[1-9]\d{1,14}$/;
    if (!whatsappRegex.test(phone)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid WhatsApp phone number format. Use: whatsapp:+[CountryCode][PhoneNumber]' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return new Response(
        JSON.stringify({ error: 'Cannot book appointments for past dates.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Construct the message content for client
    const clientMessage = `
🏛️ *Legal Service Booking Confirmation*

Thank you for booking with us! Here are your appointment details:

📋 *Service:* ${service}
👨‍💼 *Attorney:* ${attorney}
📅 *Date:* ${date}
⏰ *Time:* ${time}
👤 *Name:* ${name}
📧 *Email:* ${email}

📝 *Your Legal Issue:*
${description}

We will contact you shortly to confirm your appointment. If you need to make any changes, please call us directly.

Thank you for choosing our legal services!
    `.trim();

    // Construct the message content for internal notification
    const internalMessage = `
🚨 *NEW LEGAL SERVICE BOOKING*

📋 *Service:* ${service}
👨‍💼 *Attorney:* ${attorney}
📅 *Date:* ${date}
⏰ *Time:* ${time}

👤 *Client Details:*
• Name: ${name}
• Email: ${email}
• Phone: ${phone}

📝 *Legal Issue Description:*
${description}

⚡ *Action Required:* Please confirm this appointment with the client.
    `.trim();

    try {
      // Send confirmation message to client
      const clientResponse = await client.messages.create({
        body: clientMessage,
        from: 'whatsapp:+14155238886', // Twilio's official WhatsApp sandbox number
        to: phone, // Client's WhatsApp number
      });

      console.log('Client message SID:', clientResponse.sid);

      // Send notification to internal team (replace with your business WhatsApp number)
      const businessPhone = process.env.BUSINESS_WHATSAPP_NUMBER || 'whatsapp:+1234567890';
      
      const internalResponse = await client.messages.create({
        body: internalMessage,
        from: 'whatsapp:+14155238886', // Twilio's official WhatsApp sandbox number
        to: businessPhone, // Your business WhatsApp number
      });

      console.log('Internal notification SID:', internalResponse.sid);

      // Return success response
      return new Response(
        JSON.stringify({ 
          message: 'Booking successfully submitted! Check your WhatsApp for confirmation details.',
          bookingId: clientResponse.sid,
          status: 'confirmed'
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );

    } catch (twilioError) {
      console.error('Twilio error:', twilioError);
      
      // Handle specific Twilio errors
      if (twilioError.code === 21211) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid phone number. Please check the format and try again.' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      if (twilioError.code === 21408) {
        return new Response(
          JSON.stringify({ 
            error: 'This phone number cannot receive WhatsApp messages. Please use a different number.' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Generic Twilio error
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send WhatsApp message. Please try again or contact us directly.',
          details: process.env.NODE_ENV === 'development' ? twilioError.message : undefined
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('API Error:', error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format. Please check your data.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generic server error
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Optional: Handle GET requests to provide API info
export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'Legal Service Booking API',
      version: '1.0.0',
      endpoints: {
        POST: '/api/bookservice - Submit a new booking'
      },
      status: 'active'
    }),
    { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}