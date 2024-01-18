import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize({
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: process.env.POSTGRES_LOG === 'true',
  dialect: 'postgres'
})

export default db