import { Server } from 'socket.io'
import { createMessage } from '../services/messageService.js'

let io

const socket = server => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', socket => {
    socket.on('message', async payload => {
      const message = await createMessage(payload)
      io.emit('message', JSON.stringify(message))
    })
  })
}

export { socket, io }
