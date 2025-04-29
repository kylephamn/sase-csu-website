// netlify/functions/get-languages.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Allow GET requests for this endpoint
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Allow': 'GET',
        'Content-Type': 'application/json'
      }
    };
  }

  try {
    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: Missing API key' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Make request to Google Translate API to get supported languages
    const response = await axios({
      method: 'get',
      url: 'https://translation.googleapis.com/language/translate/v2/languages',
      params: {
        key: apiKey,
        target: 'en' // Get language names in English
      }
    });

    // Return list of supported languages
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    };
  } catch (error) {
    console.error('Languages API error:', error.response?.data || error.message);
    
    // Handle specific Google API errors
    if (error.response?.data?.error) {
      return {
        statusCode: error.response.status || 500,
        body: JSON.stringify({ 
          error: 'Languages API error', 
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