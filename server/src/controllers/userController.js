import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({
        data: null,
        code: 404,
        message: 'Usuário não encontrado!'
      })
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      return res.status(401).json({
        data: null,
        code: 401,
        message: 'Senha incorreta!'
      })
    }

    const token = jwt.sign({ user }, process.env.SECRET)

    res.json({
      data: { user, token },
      code: 200,
      message: 'Usuário logado com sucesso!'
    })
  } catch (err) {
    return res.status(500).json({
      data: null,
      code: 500,
      message: 'Erro interno do servidor'
    })
  }
}

const signup = async (req, res) => {
  const { username, email, password, pix } = req.body

  try {
    const hashedPass = await bcrypt.hash(password, 10)

    await User.create({ username, email, password: hashedPass, pix })

    res.json({ data: null, code: 201, message: 'Usuário cadastrado com sucesso!' })
  } catch (err) {
    res.json({ data: null, code: 500, message: err.errors[0].message })
  }
}

const currentUser = async (req, res) => {
  res.json({ data: { user: req.user } })
}

export { signin, signup, currentUser }
