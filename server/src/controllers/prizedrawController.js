import { getCurrentPrizedraw, getLastWinner } from "../services/prizedrawService.js"

const index = async (_req, res) => {
  try {
    const { totalAmount } = await getCurrentPrizedraw()

    res.send({
      data: totalAmount,
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

const lastWinner = async (_req, res) => {
  try {
    const prizedraw = await getLastWinner();

    res.send({
      data: { totalAmount: prizedraw.totalAmount, username: prizedraw.user.username },
      code: 200,
      message: 'Último vencedor encontrado com sucesso'
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

export { index, lastWinner }