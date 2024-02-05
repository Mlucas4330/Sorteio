import { Router } from 'express'
import { configWebhook, webhookPix, webhook } from '../controllers/pixController.js'

const pixRouter = Router()

pixRouter.post('/config-webhook', configWebhook)
pixRouter.post('/webhook', webhook)
pixRouter.post('/webhook/pix', webhookPix)

export default pixRouter
