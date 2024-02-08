import { Router } from 'express'
import { index } from '../controllers/messageController.js'

const messageRouter = Router()

messageRouter.get('/messages', index)

export default messageRouter