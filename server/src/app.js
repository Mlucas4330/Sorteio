const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/databaseConfig')
const userRouter = require('./routes/userRoutes')
const prizedrawRouter = require('./routes/prizedrawRouter')
const depositRouter = require('./routes/depositRouter')
const associateModels = require('./models/index')
const { createServer } = require('http')
const socket = require('./socket/socket')
const cron = require('node-cron')
const { resetPrizedraw } = require('./jobs/prizedrawJob')

const main = async () => {
  const app = express()
  const server = createServer(app)

  app.use(cors())
  app.use(express.json())

  app.use(userRouter)
  app.use(prizedrawRouter)
  app.use(depositRouter)

  const port = process.env.PORT || 3000

  try {
    associateModels()

    socket(server)

    await db.sync({ alter: true })

    cron.schedule('0 0 0 * * *', resetPrizedraw, {
      scheduled: true,
      timezone: 'America/Sao_Paulo'
    })

    server.listen(port, () => {
      console.log('Server running on port: ' + port)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
