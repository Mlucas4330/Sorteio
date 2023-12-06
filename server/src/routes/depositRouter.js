const express = require('express')
const { deposit } = require('../controllers/depositController')
const { verifyJWT } = require('../middlewares/jwtMiddleware')

const depositRouter = express.Router()

depositRouter.post('/deposit', verifyJWT, deposit)

module.exports = depositRouter
