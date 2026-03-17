const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['web', 'data', 'systems']]
    }
  },
  highlight: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT,
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
  github_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  live_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'live',
    validate: {
      isIn: [['live', 'in-progress', 'archived']]
    }
  },
  complexity: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'production',
    validate: {
      isIn: [['production', 'learning', 'experimental']]
    }
  },
  phase: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'projects',
  timestamps: true,
  underscored: true
});

module.exports = Project;
