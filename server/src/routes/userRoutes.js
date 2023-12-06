const express = require('express')
const { signin, signup, currentUser } = require('../controllers/userController')
const { verifyJWT } = require('../middlewares/jwtMiddleware')

const userRouter = express.Router()

userRouter.post('/signup', signup)

userRouter.post('/signin', signin)

userRouter.get('/current-user', verifyJWT, currentUser)

module.exports = userRouter
