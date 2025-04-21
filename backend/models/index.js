const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Books = require('./booksModel');
const Checkouts = require('./checkoutsModel');
const Readers = require('./readersModel');

// Set associations
Books.hasMany(Checkouts, { foreignKey: 'book_id' });
Checkouts.belongsTo(Books, { foreignKey: 'book_id' });

Readers.hasMany(Checkouts, { foreignKey: 'reader_id' });
Checkouts.belongsTo(Readers, { foreignKey: 'reader_id' });

module.exports = { Books, Checkouts, Readers };
