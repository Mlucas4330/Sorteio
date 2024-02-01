import EfiPay from "sdk-node-apis-efi"
import options from "../configs/efipayConfig.js"
import { pixPaymentConfirmation } from "../services/pixService.js"

const configWebhook = async () => {
  options.validateMtls = false

  const body = {
    webhookUrl: 'http://localhost:3000/api/webhook',
  }

  const params = {
    chave: process.env.PIX
  }

  const efipay = new EfiPay(options)

  try {

    const response = await efipay.pixConfigWebhook(params, body)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

const webhook = async (req, res) => {
  try {
    console.log(req.body)
    // await pixPaymentConfirmation(req.user.id)

    res.send(200)
  } catch (err) {
    console.log(err)
  }
}

export { configWebhook, webhook }