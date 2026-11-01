import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRouter from './routes/portfolio.js';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(express.json({ limit: '10kb' })); // protect against payload flooding
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Flexible CORS Configuration for Local Dev and Production Hosting (Vercel, Render, Railway)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server or curl/Postman requests without origin header
    if (!origin) return callback(null, true);

    // If wildcards or matches allowed list
    if (
      process.env.NODE_ENV === 'development' ||
      !process.env.CLIENT_URL ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked request from origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Root welcome & API info endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Varikuntla Nagamounika's Portfolio API is Running",
    version: '1.0.0',
    database: false,
    storage: 'Static JSON Flat-File Cache',
    endpoints: {
      health: 'GET /api/health',
      portfolio: 'GET /api/portfolio',
      projects: 'GET /api/projects',
      contact: 'POST /api/contact'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'portfolio-backend',
    database: false,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/portfolio', portfolioRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('[Backend Server Error]:', err.message);
  
  if (err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({
      success: false,
      error: 'CORS Forbidden',
      message: err.message
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred on the server.'
  });
});

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Portfolio Backend running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📂 Portfolio Data: http://localhost:${PORT}/api/portfolio`);
  console.log(`📂 Projects: http://localhost:${PORT}/api/projects`);
  console.log(`✉️  Contact Endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`🛡️  Database: None (In-Memory JSON cache)`);
  console.log(`=========================================`);
});

export default app;

