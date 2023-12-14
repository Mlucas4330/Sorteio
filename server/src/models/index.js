import User from './userModel.js'
import Deposit from './depositModel.js'
import Prizedraw from './prizedrawModel.js'
import Message from './messageModel.js'

const associations = () => {
  Prizedraw.belongsTo(User)
  Prizedraw.hasMany(Deposit)
  Deposit.belongsTo(User)
  Deposit.belongsTo(Prizedraw)
  User.hasMany(Deposit)
  User.hasMany(Message)
  Message.belongsTo(User)
}

export default associations
