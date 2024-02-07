import { pixCharge } from '../services/pixService.js'

const create = async (req, res) => {
  try {
    const { amount } = req.body

    if (!amount) {
      return res.status(400).send({
        code: 400,
        message: 'Valor não pode ser vazio',
        data: null
      })
    }

    const { imagemQrcode, pixCopiaECola } = await pixCharge(amount, req.user.id)

    res.status(201).send({
      code: 201,
      message: 'QrCode Gerado com sucesso!',
      data: { imagemQrcode, pixCopiaECola }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      code: 500,
      message: err.message,
      data: null
    })
  }
}

export { create }
