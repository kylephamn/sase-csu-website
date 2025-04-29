// netlify/functions/translate.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Allow': 'POST',
        'Content-Type': 'application/json'
      }
    };
  }

  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    const { text, targetLang, sourceLang = 'auto' } = requestBody;

    // Validate required parameters
    if (!text || !targetLang) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required parameters', 
          required: ['text', 'targetLang'], 
          optional: ['sourceLang'] 
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing API key' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Make request to Google Translate API
    const response = await axios({
      method: 'post',
      url: 'https://translation.googleapis.com/language/translate/v2',
      params: {
        key: apiKey
      },
      data: {
        q: text,
        target: targetLang,
        source: sourceLang === 'auto' ? undefined : sourceLang,
        format: 'text'
      }
    });

    // Return translated text
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    };
  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    
    // Handle specific Google API errors
    if (error.response?.data?.error) {
      return {
        statusCode: error.response.status || 500,
        body: JSON.stringify({ 
          error: 'Translation API error', 
          details: error.response.data.error.message || 'Unknown error'
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Generic error handler
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', message: error.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};