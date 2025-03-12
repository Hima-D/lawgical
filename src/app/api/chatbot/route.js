import { HfInference } from '@huggingface/inference';
import formidable from 'formidable';

// Initialize Hugging Face API with the API key
const hfApiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;

if (!hfApiKey) {
  throw new Error('Hugging Face API key is missing. Please set it in .env.local.');
}

const hf = new HfInference(hfApiKey);

// Helper function to validate text input
const isValidInput = (input) => {
  return input && typeof input === 'string' && input.trim().length > 0;
};

// Use formidable to parse form data and handle files
const parseFormData = (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.Form(); // Use Form() instead of IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export async function POST(req) {
  try {
    const { fields, files } = await parseFormData(req); // Parse the form data
    const text = fields.text ? fields.text[0] : null; // Extract 'text' from fields

    // Validate input text
    if (!isValidInput(text)) {
      return new Response(
        JSON.stringify({ error: 'Invalid input. Please provide non-empty text.' }),
        { status: 400 }
      );
    }

    // Call Hugging Face API for text generation
    const response = await hf.textGeneration({
      model: 'gpt2', // You can change this to another model
      inputs: text,
      parameters: { max_length: 100, temperature: 0.7, top_p: 0.9, top_k: 50 },
    });

    const generatedText = response[0]?.generated_text || 'No text generated.';
    return new Response(JSON.stringify({ result: generatedText }), { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing the request' }),
      { status: 500 }
    );
  }
}
