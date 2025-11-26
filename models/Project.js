const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  githubUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'github_url'
  },
  liveUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'live_url'
  }
}, {
  tableName: 'projects',
  timestamps: true,
  underscored: true
});

module.exports = Project;
