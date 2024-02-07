import Deposit from '../models/depositModel.js'
import Prizedraw from '../models/prizedrawModel.js'
import { Sequelize } from 'sequelize'

const getCurrentPrizedraw = async () => {
  const [prizedraw, _] = await Prizedraw.findOrCreate({
    where: {
      finished: false
    }
  })

  const totalAmount = await Deposit.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
    ],
    where: {
      prizedrawId: prizedraw.id
    }
  })

  return { prizedraw, totalAmount }
}

const startPrizedraw = async () => {
  await Prizedraw.create()
}

export { getCurrentPrizedraw, startPrizedraw }
