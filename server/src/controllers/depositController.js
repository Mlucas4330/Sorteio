import { pixCharge } from '../services/pixService.js'

const deposit = async (req, res) => {
  const { amount } = req.body

  try {
    const result = await pixCharge(amount)

    res.json({ code: 201, message: 'QrCode Gerado com sucesso!', data: { qrCode: result.imagemQrcode } })
  } catch (err) {
    res.json({ code: 500, message: err.mensagem, data: null })
  }
}

export { deposit }
