import { DataTypes } from 'sequelize'
import db from '../database/index.js'

const Message = db.define('message', {
  text: DataTypes.STRING,
  token: DataTypes.TEXT
})

export default Message
