const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isIn: [['Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Data Engineering']]
    }
  },
  proficiency_tier: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'proficient',
    validate: {
      isIn: [['proficient', 'familiar', 'learning']]
    }
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'skills',
  timestamps: true,
  underscored: true
});

module.exports = Skill;
