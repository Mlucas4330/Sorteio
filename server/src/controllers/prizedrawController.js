import { getCurrentPrizedraw } from "../services/prizedrawService.js"

const index = async (_req, res) => {
  try {
    const { totalAmount } = getCurrentPrizedraw()

    res.send({
      data: { totalAmount },
      code: 200,
      message: 'Valor total encontrado com sucesso'
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

export { index }