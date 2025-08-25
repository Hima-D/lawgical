import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Initialize OpenAI (you can replace this with other providers)
const openai = createOpenAI({
  // Add your OpenAI API key here or use environment variable
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    // Validate the request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Convert messages to the correct format
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.parts?.map(part => part.text).join('') || msg.content
    }));

    // Create the streaming response
    const result = await streamText({
      model: openai('gpt-4o-mini'), // or gpt-4, gpt-3.5-turbo, etc.
      messages: formattedMessages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    // Set headers for streaming
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    });

    // Stream the response
    for await (const chunk of result.textStream) {
      res.write(chunk);
    }

    res.end();

  } catch (error) {
    console.error('Chat API Error:', error);
    
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' 
      });
    }

    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Alternative implementation using different AI providers:

/*
// For Anthropic Claude:
import { createAnthropic } from '@ai-sdk/anthropic';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Then use: anthropic('claude-3-sonnet-20240229')
*/

/*
// For Google Gemini:
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Then use: google('gemini-pro')
*/

/*
// For local models using Ollama:
import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama({
  baseURL: 'http://localhost:11434/api',
});

// Then use: ollama('llama2') or any other local model
*/