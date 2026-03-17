const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const About = sequelize.define('About', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  paragraph_1: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  paragraph_2: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  paragraph_3: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cgpa_current: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true
  },
  tagline: {
    type: DataTypes.STRING(120),
    allowNull: true
  }
}, {
  tableName: 'about',
  timestamps: true,
  underscored: true
});

module.exports = About;
