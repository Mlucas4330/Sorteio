import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

const updatePix = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }
    })
    user.pix = req.body.pix;

    user.save()

    res.send({
      data: { pix: user.pix },
      message: 'Pix alterado com sucesso',
      code: 200
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      data: null,
      code: 500,
      message: 'Erro interno do servidor'
    })
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).send({
        data: null,
        code: 404,
        message: 'Usuário não encontrado!'
      })
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      return res.status(401).send({
        data: null,
        code: 401,
        message: 'Senha incorreta!'
      })
    }

    const token = jwt.sign({ user }, process.env.SECRET)

    res.send({
      data: { user, token },
      code: 200,
      message: 'Usuário logado com sucesso!'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
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

    res.status(201).send({
      data: null,
      code: 201,
      message: 'Usuário cadastrado com sucesso!'
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: null,
      code: 500,
      message: 'Erro interno de servidor'
    })
  }
}

const currentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    })
    res.send({
      data: user,
      code: 200
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      data: null,
      code: 500,
      message: 'Erro interno do servidor'
    })
  }
}

export { updatePix, signin, signup, currentUser }
