import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import Message from '../models/messageModel.js'
import User from '../models/userModel.js'
import { getAllMessages } from '../services/messageService.js'
import { getAllDeposits } from '../services/depositService.js'
import { getCurrentPrizedraw } from '../services/prizedrawService.js'

const socket = server => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', async socket => {

    socket.on('messages', async () => {
      const messages = await getAllMessages()
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

    socket.on('deposits', async () => {
      const deposits = await getAllDeposits()
      io.emit('deposits', deposits)
    })

    socket.on('total amount', async () => {
      const { totalAmount } = await getCurrentPrizedraw()
      io.emit('total amount', totalAmount)
    })
  })
}

export default socket
