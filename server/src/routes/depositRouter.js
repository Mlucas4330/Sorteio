import { Router } from 'express'
import { create } from '../controllers/depositController.js'
import { verifyJWT } from '../middlewares/index.js'

const depositRouter = Router()

depositRouter.post('/deposit', verifyJWT, create)

export default depositRouter
