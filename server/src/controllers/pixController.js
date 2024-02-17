import EfiPay from "sdk-node-apis-efi"
import options from "../configs/efipayConfig.js"
import { io } from "../sockets/index.js"
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

    pix.map(async pix => {
      const deposit = await getDepositByTxidAndUpdate(pix.txid)
      io.emit('deposit', JSON.stringify(deposit))
      io.emit('payed', JSON.stringify({ userId: deposit.user.id }))
      io.emit('total amount', pix.valor)
    })

    res.status(201).send({
      message: 'Depósito criado com sucesso',
      data: pix,
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