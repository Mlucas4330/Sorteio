import { DataTypes } from 'sequelize'
import db from '../config/databaseConfig.js'

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

export default Deposit
