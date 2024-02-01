import { Router } from 'express'
import { webhook } from '../controllers/pixController'

const pixRouter = Router()

pixRouter.post('/webhook', webhook)

export default pixRouter
