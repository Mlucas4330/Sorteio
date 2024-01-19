import { Server } from 'socket.io'
import verify from 'jsonwebtoken'
import Message from '../models/messageModel.js'
import User from '../models/userModel.js'

const socket = server => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', async socket => {
    const messages = await Message.findAll({
      include: User
    })

    io.emit('messages', messages)

    socket.on('chat message', async payload => {
      try {
        const decodedUser = verify(payload.token, process.env.SECRET)

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

export default socket
