import { Sequelize } from "sequelize"
import options from '../configs/databaseConfig.js'

const db = new Sequelize(options)

export default db