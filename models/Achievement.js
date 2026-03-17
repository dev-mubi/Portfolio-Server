const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Achievement = sequelize.define('Achievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'certification',
    validate: {
      isIn: [['certification', 'academic', 'award']]
    }
  },
  issuer: {
    type: DataTypes.STRING(120),
    allowNull: true
  },
  period: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING(30),
    defaultValue: 'Award'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'achievements',
  timestamps: true,
  underscored: true
});

module.exports = Achievement;
