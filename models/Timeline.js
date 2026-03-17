const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Timeline = sequelize.define('Timeline', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  period: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  phase: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  label: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  headline: {
    type: DataTypes.STRING(160),
    allowNull: false
  },
  narrative: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cgpa_context: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'past',
    validate: {
      isIn: [['past', 'current', 'future']]
    }
  },
  sort_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'timeline',
  timestamps: true,
  underscored: true
});

module.exports = Timeline;
