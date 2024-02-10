import { Router } from 'express'
import { index, lastWinner } from '../controllers/prizedrawController.js'
import { resetPrizedraw } from '../jobs/index.js'

const prizedrawRouter = Router()

prizedrawRouter.get('/total-amount', index)
prizedrawRouter.get('/last-winner', lastWinner)
prizedrawRouter.get('/teste', resetPrizedraw)

export default prizedrawRouter
