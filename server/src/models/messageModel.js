const { DataTypes } = require('sequelize')
const db = require('../config/databaseConfig')

const Message = db.define('message', {
  text: DataTypes.STRING,
  token: DataTypes.TEXT
})

module.exports = Message
