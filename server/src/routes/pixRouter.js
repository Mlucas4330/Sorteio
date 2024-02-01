import { Router } from 'express'
import { configWebhook, webhook } from '../controllers/pixController.js'

const pixRouter = Router()

pixRouter.post('/config-webhook', configWebhook)
pixRouter.post('/webhook', webhook)

export default pixRouter
