const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection, syncDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const servicesRoutes = require('./routes/services');
const skillsRoutes = require('./routes/skills');
const achievementsRoutes = require('./routes/achievements');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
