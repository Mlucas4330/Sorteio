import { Router } from 'express'
import { create, index } from '../controllers/prizedrawController.js'

const prizedrawRouter = Router()

prizedrawRouter.get('/prizedraw', index)
prizedrawRouter.post('/prizedraw', create)

export default prizedrawRouter
