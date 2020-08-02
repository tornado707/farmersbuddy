const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('machineries', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  info: {
    type: Sequelize.STRING
  },
  uses: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  videoUrl: {
    type: Sequelize.STRING
  }
})

