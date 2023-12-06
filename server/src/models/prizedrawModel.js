const { DataTypes } = require('sequelize')
const db = require('../config/databaseConfig')

const Prizedraw = db.define('prizedraw', {
  finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Prizedraw
