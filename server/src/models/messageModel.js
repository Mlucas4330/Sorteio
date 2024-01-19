import { DataTypes } from 'sequelize'
import db from '../configs/databaseConfig.js'

const Message = db.define('message', {
  text: DataTypes.STRING,
  token: DataTypes.TEXT
})

export default Message
