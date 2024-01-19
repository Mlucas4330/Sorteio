import { Router } from 'express'
import { signup, signin, currentUser } from '../controllers/userController.js'
import { verifyJWT } from '../middlewares/jwtMiddleware.js'

const userRouter = Router()

userRouter.post('/signup', signup)

userRouter.post('/signin', signin)

userRouter.get('/current-user', verifyJWT, currentUser)

export default userRouter
