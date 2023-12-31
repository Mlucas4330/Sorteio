import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './src/config/databaseConfig.js'
import userRouter from './src/routes/userRoutes.js'
import prizedrawRouter from './src/routes/prizedrawRouter.js'
import depositRouter from './src/routes/depositRouter.js'
import associations from './src/models/index.js'
import { createServer } from 'http'
import socket from './src/socket/socket.js'
import { schedule } from 'node-cron'
import { resetPrizedraw } from './src/jobs/prizedrawJob.js'

const main = async () => {
  try {
    const app = express()
    const server = createServer(app)
  
    dotenv.config()
  
    app.use(cors())
    app.use(json())
  
    app.use(userRouter)
    app.use(prizedrawRouter)
    app.use(depositRouter)

    associations()

    socket(server)

    await db.sync({ alter: true })

    schedule('0 0 0 * * *', resetPrizedraw, {
      scheduled: true,
      timezone: 'America/Sao_Paulo'
    })

    server.listen(process.env.PORT)
  } catch (err) {
    console.log(err)
  }
}

main()
