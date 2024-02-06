import EfiPay from "sdk-node-apis-efi"
import options from "../configs/efipayConfig.js"
import { pixPaymentConfirmation } from "../services/pixService.js"
import EventEmitter from 'eventemitter3'

const configWebhook = async (_req, res) => {
  options.validateMtls = false

  const body = {
    webhookUrl: process.env.WEBHOOK_URL,
  }

  const params = {
    chave: process.env.PIX
  }

  const efipay = new EfiPay(options)

  try {
    const response = await efipay.pixConfigWebhook(params, body)

    res.send(response)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

const webhook = async (_req, res) => {
  try {
    const params = {
      chave: process.env.PIX,
    };

    const efipay = new EfiPay(options);

    const details = await efipay.pixDetailWebhook(params)

    res.send(details)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

const webhookPix = async (req, res) => {
  try {
    const eventEmitter = new EventEmitter()

    console.log(req.params.pix.valor)

    const deposit = await pixPaymentConfirmation(req.params.pix.valor, req.user.id)
    eventEmitter.emit('deposit', deposit);
    res.send(req.params.pix)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

export { configWebhook, webhook, webhookPix }