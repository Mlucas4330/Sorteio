import { DataTypes } from 'sequelize'
import db from '../configs/databaseConfig.js'

const Prizedraw = db.define('prizedraw', {
  finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

export default Prizedraw
