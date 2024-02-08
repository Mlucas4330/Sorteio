import { Router } from 'express'
import { index } from '../controllers/prizedrawController.js'

const prizedrawRouter = Router()

prizedrawRouter.get('/total-amount', index)

export default prizedrawRouter
