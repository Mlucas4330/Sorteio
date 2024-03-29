import { DataTypes } from 'sequelize'
import db from '../database/index.js'

const Prizedraw = db.define('prizedraw', {
  finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  totalAmount: DataTypes.DECIMAL
})

export default Prizedraw
