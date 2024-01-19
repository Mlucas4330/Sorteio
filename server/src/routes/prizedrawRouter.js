import { Router } from 'express'
import { index }  from '../controllers/prizedrawController.js'

const prizedrawRouter = Router()

prizedrawRouter.get('/amount', index)

export default prizedrawRouter
