const express = require('express')
const { index } = require('../controllers/prizedrawController')

const prizedrawRouter = express.Router()

prizedrawRouter.get('/amount', index)

module.exports = prizedrawRouter
