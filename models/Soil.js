const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('soils', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  place: {
    type: Sequelize.STRING
  }
})

