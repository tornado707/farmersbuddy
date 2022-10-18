const Sequelize = require('sequelize');

module.exports = new Sequelize('farmerbud', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    },

});