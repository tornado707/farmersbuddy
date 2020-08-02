const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('flowers', {
  name: {
    type: Sequelize.STRING
  },
  season: {
    type: Sequelize.STRING
  },
  fltype: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})