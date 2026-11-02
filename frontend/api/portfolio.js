/**
 * Vercel Serverless Function: GET /api/portfolio
 */
import { fallbackPortfolioData } from '../src/data/fallbackPortfolio.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    dataSource: 'Production Cloud REST API (No Database)',
    data: fallbackPortfolioData,
  });
}

