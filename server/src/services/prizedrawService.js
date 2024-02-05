import Deposit from '../models/depositModel.js'
import Prizedraw from '../models/prizedrawModel.js'

const getCurrentPrizedraw = async () => {
  const prizedraw = await Prizedraw.findOne({
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
  return await Prizedraw.create({})
}

export { getCurrentPrizedraw, startPrizedraw }
