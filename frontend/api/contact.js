/**
 * Vercel Serverless Function: POST /api/contact
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, message, botcheck } = req.body || {};

  // Honeypot spam protection
  if (botcheck) {
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
  }

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Name, email, and message are required fields.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Message delivered to REST API backend successfully.',
  });
}

