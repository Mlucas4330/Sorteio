import EfiPay from 'sdk-node-apis-efi'
import options from '../configs/efipayConfig.js'
import { currentPrizedraw } from './prizedrawService.js'
import Deposit from '../models/depositModel.js'

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

const pixPaymentConfirmation = async (userId) => {
  const isPayed = true;

  if (isPayed) {
    const prizedraw = await currentPrizedraw()

    try {
      await Deposit.create({
        userId,
        prizedrawId: prizedraw.id,
        amount: 10.50
      })
    }
    catch (err) {
      console.log(err)
    }
  }
}

export { pixCharge, pixSend, pixPaymentConfirmation }
