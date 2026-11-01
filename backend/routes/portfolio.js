import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'data', 'portfolio.json');

// Helper to safely load portfolio data from JSON file (no database)
function loadPortfolioData() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * @route   GET /api/portfolio
 * @desc    Get complete portfolio payload (personal, education, skills, experience, projects, certifications, achievements)
 * @access  Public
 */
router.get('/', (req, res, next) => {
  try {
    const portfolio = loadPortfolioData();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      dataSource: 'JSON Flat File Cache (No Database)',
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
});

export default router;

