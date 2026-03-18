// netlify/functions/generate.js
// ─────────────────────────────────────────────────────────
// This is a "serverless function" - it runs on Netlify's
// servers, NOT in the browser. That's why the API key is
// safe here. The browser never sees it.
// ─────────────────────────────────────────────────────────

export default async (req) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Get the request body from the frontend
  const body = await req.json()

  try {
    // Make the call to Anthropic using our secret key
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // 🔒 Secret - lives on server only
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return Response.json(data)

  } catch (error) {
    return Response.json(
      { error: 'Failed to generate meal. Please try again.' },
      { status: 500 }
    )
  }
}

// This tells Netlify what URL to assign this function
export const config = { path: '/api/generate' }
