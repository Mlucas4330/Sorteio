import { DataTypes } from 'sequelize'
import db from '../database/index.js'

const Message = db.define('message', {
  text: DataTypes.STRING
})

export default Message
