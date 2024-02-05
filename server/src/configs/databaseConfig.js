import dotenv from 'dotenv'

dotenv.config()

const baseConfig = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  port: 5432,
  logging: process.env.POSTGRES_LOG === 'true',
}

const config = {
  production: {
    ...baseConfig,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
  },
  development: {
    ...baseConfig,
    database: process.env.DEV_POSTGRES_DB,
    host: process.env.DEV_POSTGRES_HOST,
  }
}

const options = process.env.NODE_ENV === 'development' ? config.development : config.production

export default options
