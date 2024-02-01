import { Sequelize } from 'sequelize'
import Deposit from '../models/depositModel.js'
import { currentPrizedraw } from '../services/prizedrawService.js'

const index = async (_req, res) => {
  try {
    const prizedraw = await currentPrizedraw()

    const totalAmount = await Deposit.findOne({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
      ],
      where: {
        prizedrawId: prizedraw.id
      },
      raw: true
    })

    res.json({ code: 200, data: totalAmount })
  } catch (err) {
    res.json({ message: err, data: null })
  }
}

export { index }
