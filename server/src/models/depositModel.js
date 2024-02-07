import { DataTypes } from 'sequelize'
import db from '../database/index.js'

const Deposit = db.define('deposit', {
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'O campo Valor deve ser um número'
      }
    }
  },
  txid: DataTypes.STRING,
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  } 
})

export default Deposit
