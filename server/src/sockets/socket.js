import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import Message from '../models/messageModel.js'
import User from '../models/userModel.js'

const socket = server => {
 

  io.on('connection', async socket => {
    socket.on('messages', async () => {
      const messages = await Message.findAll({
        include: User
      })

      io.emit('messages', messages)
    })

    socket.on('chat message', async payload => {
      try {
        const decodedUser = jwt.verify(payload.token, process.env.SECRET)

        const message = await Message.create({
          userId: decodedUser.user.id,
          text: payload.msg,
          token: payload.token
        })

        const messageObj = await Message.findOne({
          where: {
            id: message.id
          },
          include: User
        })

        io.emit('chat message', messageObj)
      } catch (err) {
        console.log(err)
      }
    })
  })
}

export default socket
