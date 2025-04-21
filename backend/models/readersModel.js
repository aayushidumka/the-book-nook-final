const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Readers extends Model {}

Readers.init({
  reader_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.TEXT,
  role: {
    type: DataTypes.TEXT,
    defaultValue: "reader",
  }
}, {
  sequelize,
  modelName: 'Readers',
  tableName: 'readers',
  timestamps: false,
});

module.exports = Readers;
