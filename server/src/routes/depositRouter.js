import { Router } from 'express'
import { create, index } from '../controllers/depositController.js'
import { verifyJWT } from '../middlewares/index.js'

const depositRouter = Router()

depositRouter.get('/deposits', index)
depositRouter.post('/deposit', verifyJWT, create)

export default depositRouter
