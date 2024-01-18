import EfiPay from 'sdk-node-apis-efi'
import options from '../configs/efipayConfig.js'

const pixCharge = async (amount) => {
  const efipay = new EfiPay(options)

  if (!amount) {
    throw Error('Valor não pode ser vazio')
  }

  const body = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: amount
    },
    chave: process.env.PIX
  }

  const response = await efipay.pixCreateImmediateCharge([], body)

  const params = {
    id: response.loc.id
  }

  return await efipay.pixGenerateQRCode(params)
}

const pixSend = async (amount, winnerPix) => {
  const efipay = new EfiPay(options)

  const body = {
    valor: getTaxedValue(amount),
    pagador: {
      chave: process.env.PIX
    },
    favorecido: {
      chave: winnerPix
    }
  }

  return await efipay.pixSend([], body)
}

const getTaxedValue = (amount) => {
  return amount - Number(process.env.TAX) / 100
}

const webhook = async (req, res) => {
  const efipay = new EfiPay(options)

  validateMtls = false

  const body = {
    webhookUrl: 'http://localhost:3333/webhook'
  }

  const params = {
    chave: process.env.PIX
  }

  try {
    await efipay.pixConfigWebhook(params, body)
  } catch (err) {
    res.send(err)
  }
}

export { pixCharge, pixSend, webhook }
