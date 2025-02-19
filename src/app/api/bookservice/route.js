import twilio from 'twilio';

// Retrieve Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Twilio WhatsApp-enabled number

const client = twilio(accountSid, authToken);

export async function POST(req) {
  try {
    // Parse the request body as JSON
    const data = await req.json(); 

    const { service, attorney, date, time, name, email, phone, description } = data;

    // Validate required fields
    if (!service || !attorney || !date || !time || !name || !email || !phone || !description) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400 }
      );
    }

    // Validate the phone number format (ensure it's in the 'whatsapp:+[CountryCode][PhoneNumber]' format)
    if (!phone || !/^whatsapp:\+?[1-9]\d{1,14}$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format. Ensure it follows the "whatsapp:+[CountryCode][PhoneNumber]" format.' }),
        { status: 400 }
      );
    }

    // Construct the message content
    const message = `
      New Legal Service Booking:
      Service: ${service}
      Attorney: ${attorney}
      Date: ${date}
      Time: ${time}
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Description: ${description}
    `;


    // Send a WhatsApp message to the provided phone number
    const response = await client.messages.create({
      body: message, 
      from: 'whatsapp:+14155238886', // This is Twilio's official WhatsApp number
      to: phone, // Recipient's WhatsApp number
    });

    // Log the message SID for debugging purposes
    console.log('Message SID:', response.sid);

    // Return a success response
    return new Response(
      JSON.stringify({ message: 'Booking successfully submitted. WhatsApp message sent.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);

    // Return an error response if something goes wrong
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing the request.' }),
      { status: 500 }
    );
  }
}
