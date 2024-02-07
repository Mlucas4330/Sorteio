import { Router } from 'express'
import { update, signup, signin, currentUser, changePassword, forgotPassword, resetPassword } from '../controllers/userController.js'
import { verifyJWT } from '../middlewares/index.js'
import multer from 'multer'

const userRouter = Router()
const upload = multer({ storage: multer.memoryStorage() })

userRouter.post('/user/update', [verifyJWT, upload.single('image')], update)

userRouter.post('/signup', signup)

userRouter.post('/signin', signin)

userRouter.get('/current-user', verifyJWT, currentUser)

userRouter.post('/change-password', verifyJWT, changePassword)

userRouter.post('/forgot-password', forgotPassword)

userRouter.post('/reset-password', resetPassword)

export default userRouter
