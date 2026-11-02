/**
 * Vercel Serverless Function: GET /api/projects
 */
import { fallbackPortfolioData } from '../src/data/fallbackPortfolio.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const projects = fallbackPortfolioData.projects || [];
  return res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
}

