const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('markets', {
  name: {
    type: Sequelize.STRING
  },
  place: {
    type: Sequelize.STRING
  },
  rate: {
    type: Sequelize.STRING
  },
  imageUrl: {
  	type: Sequelize.STRING
  }
})

