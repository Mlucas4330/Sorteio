import dotenv from 'dotenv'

dotenv.config()

const options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  port: 5432,
  logging: process.env.POSTGRES_LOG === 'true',
  database: process.env.NODE_ENV === 'development' ? process.env.DEV_POSTGRES_DB : process.env.POSTGRES_DB,
  host: process.env.NODE_ENV === 'development' ? process.env.DEV_POSTGRES_HOST : process.env.POSTGRES_HOST
}

export default options
