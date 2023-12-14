import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/databaseConfig.js'
import userRouter from './routes/userRoutes.js'
import prizedrawRouter from './routes/prizedrawRouter.js'
import depositRouter from './routes/depositRouter.js'
import associations from './models/index.js'
import { createServer } from 'http'
import socket from './socket/socket.js'
import { schedule } from 'node-cron'
import { resetPrizedraw } from './jobs/prizedrawJob.js'

const main = async () => {
  const app = express()
  const server = createServer(app)

  dotenv.config()

  app.use(cors())
  app.use(json())

  app.use(userRouter)
  app.use(prizedrawRouter)
  app.use(depositRouter)

  const port = process.env.PORT || 3000

  try {
    associations()

    socket(server)

    await db.sync({ alter: true })

    schedule('0 0 0 * * *', resetPrizedraw, {
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
