import EfiPay from "sdk-node-apis-efi"
import options from "../configs/efipayConfig.js"
import { io } from "../sockets/index.js"
import { getCurrentPrizedraw } from "../services/prizedrawService.js"
import { getDepositByTxidAndUpdate } from "../services/depositService.js"

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

    res.send({
      message: 'Webhook configurado',
      data: response,
      code: 200
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: null,
      message: err,
      code: 500
    })
  }
}

const webhook = async (_req, res) => {
  try {
    const params = {
      chave: process.env.PIX,
    };

    const efipay = new EfiPay(options);

    const details = await efipay.pixDetailWebhook(params)

    res.send({
      code: 200,
      message: 'Detalhes do webhook configurado',
      data: details
    })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}

const webhookPix = async (req, res) => {
  try {
    const { pix } = req.body

    io.emit('payed', true);

    return res.send({
      data: pix || req.body
    })

    const deposit = getDepositByTxidAndUpdate(req.params.pix.txid)



    io.emit('deposit', deposit)

    const { totalAmount } = await getCurrentPrizedraw()
    io.emit('total amount', totalAmount)

    res.status(201).send({
      message: 'Depósito criado com sucesso',
      data: deposit,
      code: 201
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      code: 500,
      data: null,
      message: err
    })
  }
}

export { configWebhook, webhook, webhookPix }