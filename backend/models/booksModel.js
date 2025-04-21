const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Books extends Model {} // recommended modern Sequelize practice

Books.init({
  book_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  book_title: DataTypes.TEXT,
  book_author: DataTypes.TEXT,
  publish_date: DataTypes.DATE,
  cover_image_url: DataTypes.TEXT,
  book_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,  // true = active, false = inactive
  },
}, {
  sequelize,
  modelName: 'Books',
  tableName: 'books',
  timestamps: false,
});

module.exports = Books;
