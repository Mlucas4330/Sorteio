import EfiPay from 'sdk-node-apis-efi'
import options from '../configs/efipayConfig.js'
import { getCurrentPrizedraw } from './prizedrawService.js'
import Deposit from '../models/depositModel.js'

const pixCharge = async (amount) => {
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
  return (amount - Number(process.env.TAX) / 100).toFixed(2)
}

const pixPaymentConfirmation = async (amount, userId) => {
  const { prizedraw } = await getCurrentPrizedraw()

  try {
    const deposit = await Deposit.create({
      userId,
      prizedrawId: prizedraw.id,
      amount
    })

    return deposit
  }
  catch (err) {
    return err
  }
}

export { pixCharge, pixSend, pixPaymentConfirmation }
