import { Router } from 'express'
import { updatePix, signup, signin, currentUser, changePassword, forgotPassword, resetPassword } from '../controllers/userController.js'
import { verifyJWT } from '../middlewares/index.js'

const userRouter = Router()

userRouter.post('/user/update/pix', verifyJWT, updatePix)

userRouter.post('/signup', signup)

userRouter.post('/signin', signin)

userRouter.get('/current-user', verifyJWT, currentUser)

userRouter.post('/change-password', verifyJWT, changePassword)

userRouter.post('/forgot-password', forgotPassword)

userRouter.post('/reset-password', resetPassword)

export default userRouter
