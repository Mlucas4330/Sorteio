import { getCurrentPrizedraw } from '../services/prizedrawService.js'

const index = async (_req, res) => {
  try {
    const { totalAmount } = await getCurrentPrizedraw()

    res.send({ code: 200, data: totalAmount })
  } catch (err) {
    res.status(500).send({
      code: 500,
      message: err,
      data: null
    })
  }
}

export { index }
