import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './src/database/index.js'
import userRouter from './src/routes/userRoutes.js'
import prizedrawRouter from './src/routes/prizedrawRouter.js'
import depositRouter from './src/routes/depositRouter.js'
import associateModels from './src/models/index.js'
import { createServer } from 'http'
import { socket } from './src/sockets/index.js'
import { schedule } from 'node-cron'
import { resetPrizedraw } from './src/jobs/index.js'
import pixRouter from './src/routes/pixRouter.js'

const main = async () => {
  try {
    const app = express()
    const server = createServer(app)

    dotenv.config()

    app.use(cors())
    app.use(json())

    app.use('/api', [userRouter, prizedrawRouter, depositRouter, pixRouter])

    associateModels()

    socket(server)

    await db.sync({ alter: true });

    schedule('0 0 0 * * *', resetPrizedraw, {
      scheduled: true,
      timezone: 'America/Sao_Paulo'
    })

    server.listen(process.env.PORT || 3000)
  } catch (err) {
    console.log(err)
  }
}

main()
