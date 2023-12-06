const { DataTypes } = require('sequelize')
const db = require('../config/databaseConfig')

const Deposit = db.define('deposit', {
  amount: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.00,
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'O campo Valor deve ser um número'
      }
    }
  }
})

module.exports = Deposit
