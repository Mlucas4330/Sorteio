const User = require('./userModel')
const Deposit = require('./depositModel')
const Prizedraw = require('./prizedrawModel')
const Message = require('./messageModel')

module.exports = () => {
  Prizedraw.belongsTo(User)
  Prizedraw.hasMany(Deposit)
  Deposit.belongsTo(User)
  Deposit.belongsTo(Prizedraw)
  User.hasMany(Deposit)
  User.hasMany(Message)
  Message.belongsTo(User)
}
