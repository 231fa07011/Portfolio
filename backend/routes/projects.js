import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'data', 'portfolio.json');

function loadProjects() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const parsed = JSON.parse(raw);
  return parsed.projects || [];
}

/**
 * @route   GET /api/projects
 * @desc    Get all projects with optional filtering by featured or category
 * @access  Public
 */
router.get('/', (req, res, next) => {
  try {
    let projects = loadProjects();
    const { featured, category, search } = req.query;

    if (featured === 'true') {
      projects = projects.filter(p => p.featured === true);
    }

    if (category) {
      projects = projects.filter(p =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project details by ID
 * @access  Public
 */
router.get('/:id', (req, res, next) => {
  try {
    const projects = loadProjects();
    const project = projects.find(p => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID '${req.params.id}' not found.`
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

export default router;

