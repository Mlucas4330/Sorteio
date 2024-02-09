import EfiPay from 'sdk-node-apis-efi'
import options from '../configs/efipayConfig.js'
import { createDeposit } from './depositService.js'

const pixCharge = async (amount, userId) => {
  const efipay = new EfiPay(options)

  const body = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: amount
    },
    chave: process.env.PIX
  }

  const { pixCopiaECola, txid, loc } = await efipay.pixCreateImmediateCharge([], body)

  await createDeposit(amount, userId, txid)

  const params = {
    id: loc.id
  }

  const { imagemQrcode } = await efipay.pixGenerateQRCode(params)

  return { pixCopiaECola, imagemQrcode }
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
  return (Number(amount) - (Number(process.env.TAX) / 100)).toFixed(2);
}

export { pixCharge, pixSend }
