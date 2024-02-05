import { Router } from 'express'
import { updatePix, signup, signin, currentUser } from '../controllers/userController.js'
import { verifyJWT } from '../middlewares/index.js'

const userRouter = Router()

userRouter.post('/user/update/pix', verifyJWT, updatePix)

userRouter.post('/signup', signup)

userRouter.post('/signin', signin)

userRouter.get('/current-user', verifyJWT, currentUser)

export default userRouter
