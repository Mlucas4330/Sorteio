import { Router } from 'express'
import { deposit } from '../controllers/depositController.js'
import { verifyJWT } from '../middlewares/jwtMiddleware.js'

const depositRouter = Router()

depositRouter.post('/deposit', verifyJWT, deposit)

export default depositRouter
