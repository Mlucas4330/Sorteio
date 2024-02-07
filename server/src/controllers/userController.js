import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import nodemailer from 'nodemailer'

const update = async (req, res) => {
  try {
    const { pix, image } = req.body

    const alreadyExist = await User.findOne({
      where: {
        pix,
        userId: {
          [Op.not]: req.user.id
        }
      }
    })

    if (alreadyExist) {
      return res.status(400).send({
        data: null,
        message: 'Já existe um usuário com esta chave PIX',
        code: 400
      })
    }

    const [_, user] = await User.update(
      { pix, image },
      { where: { id: req.user.id } }
    )

    res.send({
      data: null,
      message: 'Usuário alterado com sucesso',
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
    const { username, password } = req.body

    const user = await User.findOne({ where: { username } })

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
  try {
    const { username, email, password, pix } = req.body

    const alreadyExist = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { pix },
          { username }
        ]
      }
    })

    if (alreadyExist) {
      return res.status(400).send({
        data: null,
        code: 400,
        message: 'Usuário já cadastrado!'
      })
    }

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
      data: { user },
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

const changePassword = async (req, res) => {
  try {
    const { oldpass, newpass } = req.body;

    const user = await User.findByPk(user.req.id);

    if (!user) {
      return res.status(404).send({
        code: 404,
        message: 'Usuário não encontrado',
        data: null
      });
    }

    const result = await bcrypt.compare(oldpass, user.password);

    if (!result) {
      return res.status(401).send({
        message: 'A senha antiga é inválida',
        code: 401,
        data: null
      });
    }

    const hashedPass = await bcrypt.hash(newpass, 10);

    user.password = hashedPass;

    await user.save()

    res.send({
      data: null,
      code: 200,
      message: 'Senha alterada com sucesso'
    });
  } catch (err) {
    res.send({
      code: 500,
      message: 'Erro interno de servidor',
      data: null
    })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });

    const { email } = req.body;

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).send({
        data: null,
        code: 404,
        message: 'Usuário não encontrado!'
      })
    }

    const resetToken = jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '1h' });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Alterar Senha',
      text: `Clique no link para alterar sua senha: ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          code: 500,
          data: null,
          message: 'Erro interno de servidor'
        });
      }

      res.send({
        data: null,
        code: 200,
        message: 'Email de alteração de senha enviado com sucesso.'
      });
    });
  } catch (err) {
    console.error(err);
    res.send({
      code: 500,
      message: 'Erro interno de servidor',
      data: null
    })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, newpass } = req.body;

    const { userId } = jwt.verify(token, process.env.SECRET);

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).send({
        data: null,
        code: 404,
        message: 'Usuário não encontrado!'
      })
    }

    const hashedPass = await bcrypt.hash(newpass, 10);

    user.password = hashedPass;

    await user.save()

    res.send({
      data: null,
      message: 'Senha alterada com sucesso',
      code: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      data: null,
      message: 'Erro interno de servidor',
      code: 500
    });
  }
}

export { update, signin, signup, currentUser, changePassword, forgotPassword, resetPassword }
