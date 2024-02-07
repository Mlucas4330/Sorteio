import { Router } from 'express'
import { create, index } from '../controllers/prizedrawController.js'

const prizedrawRouter = Router()

prizedrawRouter.get('/prizedraw', index)

export default prizedrawRouter
