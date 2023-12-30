import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const uri = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}`

const db = new Sequelize(uri, {
  logging: process.env.POSTGRES_LOG === 'true',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default db