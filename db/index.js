const { Sequelize } = require('sequelize');

const db = new Sequelize('campus_management', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = db;
