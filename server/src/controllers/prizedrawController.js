import { getCurrentPrizedraw } from "../services/prizedrawService.js"

const index = async (req, res) => {
  try {
    const { totalAmount } = getCurrentPrizedraw()

    res.send({
      data: { totalAmount },
      code: 200,
      message: 'Valor total encontrado com sucesso'
    })
  } catch (err) {
    console.log(err)
  }
}

export { index }