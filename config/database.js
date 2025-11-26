const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use DATABASE_PUBLIC_URL for local development, DATABASE_URL for production
const databaseUrl = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

// Check if using public URL (TCP proxy doesn't need SSL)
const isPublicUrl = databaseUrl?.includes('railway-tcp-proxy') || databaseUrl?.includes('containers');

// Initialize Sequelize with Railway PostgreSQL
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: isPublicUrl ? {} : {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    process.exit(1);
  }
};

// Sync database (create tables if they don't exist)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
  }
};

module.exports = { sequelize, testConnection, syncDatabase };
