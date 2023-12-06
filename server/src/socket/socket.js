const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const Message = require('../models/messageModel')
const User = require('../models/userModel')

const socket = server => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173'
    }
  })

  io.on('connection', async socket => {
    const messages = await Message.findAll({
      include: User
    })

    io.emit('messages', messages)

    socket.on('chat message', async payload => {
      try {
        const decodedUser = jwt.verify(payload.token, process.env.SECRET)

        const message = await Message.create({
          userId: decodedUser.user.id,
          text: payload.msg,
          token: payload.token
        })

        const messageObj = message.get()

        messageObj.user.username = decodedUser.user.username

        io.emit('chat message', messageObj)
      } catch (err) {
        console.log(err)
      }
    })
  })
}

module.exports = socket
