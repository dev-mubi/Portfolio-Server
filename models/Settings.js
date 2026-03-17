const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contact_email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  availability_status: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  github_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  linkedin_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  instagram_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  resume_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'settings',
  timestamps: true,
  underscored: true
});

module.exports = Settings;
