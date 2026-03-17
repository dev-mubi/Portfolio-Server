const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection, syncDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const servicesRoutes = require('./routes/services');
const skillsRoutes = require('./routes/skills');
const achievementsRoutes = require('./routes/achievements');
const timelineRoutes = require('./routes/timeline');
const aboutRoutes = require('./routes/about');
const settingsRoutes = require('./routes/settings');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// Apply rate limiter to all API routes
app.use('/api', apiLimiter);

// Core Middleware
app.use(cors({
  origin: true, // Allow all origins (easiest for Vercel preview deployments)
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/admin/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/admin/services', servicesRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/admin/skills', skillsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/admin/achievements', achievementsRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/admin/timeline', timelineRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/admin/about', aboutRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/home/contact', contactRoutes); // Alias for existing frontend endpoint

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Initialize server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync database (create tables)
    await syncDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
