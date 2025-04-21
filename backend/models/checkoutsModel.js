const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Checkouts extends Model {}

Checkouts.init({
  reader_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  book_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  checkout_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,  // true = active, false = inactive
  },
  latest_return_day: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '2 weeks'")
  },
}, {
  sequelize,
  modelName: 'Checkouts',
  tableName: 'checkouts',
  timestamps: false,
});

module.exports = Checkouts;
