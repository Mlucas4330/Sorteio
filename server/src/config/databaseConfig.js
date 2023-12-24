import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const DB_NAME = process.env.NODE_ENV === 'development' ? process.env.DEV_DB_NAME : process.env.PROD_DB_NAME

const db = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  logging: process.env.DB_LOG === 'true',
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: DB_NAME
})

export default db