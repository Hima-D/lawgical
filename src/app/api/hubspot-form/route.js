// For App Router: src/app/api/hubspot-form/route.js
export async function POST(request) {
  console.log('POST handler called'); // Debug log
  
  try {
    const { email, firstname, lastname, ...otherFields } = await request.json();
    
    // Get your private app token from environment variables
    const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    
    if (!HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HubSpot access token not configured');
    }

    // Create contact payload
    const contactData = {
      properties: {
        email,
        firstname,
        lastname,
        ...otherFields
      }
    };
    
    console.log('Creating HubSpot contact:', contactData); // Debug log

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(contactData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('HubSpot contact created:', result.id);
      return Response.json({ success: true, contactId: result.id }, { status: 200 });
    } else {
      const errorText = await response.text();
      console.error('HubSpot API error:', response.status, errorText);
      
      // Handle duplicate contact (409 error)
      if (response.status === 409) {
        return Response.json({ 
          success: true, 
          message: 'Contact already exists' 
        }, { status: 200 });
      }
      
      throw new Error(`HubSpot API failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Route handler error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS preflight
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}