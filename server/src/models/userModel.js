import { DataTypes } from 'sequelize'
import db from '../database/index.js'

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      min: 5,
      max: 50,
      notEmpty: {
        msg: 'O campo Usuário deve ser preenchido'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo Email deve ser preenchido'
      },
      isEmail: {
        msg: 'O campo Email deve ter um formato de email válido'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo Senha deve ser preenchido'
      }
    }
  },
  pix: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'O campo PIX deve ser preenchido'
      }
    }
  },
  image: DataTypes.BLOB
})

export default User
