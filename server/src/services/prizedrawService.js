import Deposit from '../models/depositModel.js'
import Prizedraw from '../models/prizedrawModel.js'

const currentPrizedraw = async () => {
  const prizedraw = await Prizedraw.findOne({
    where: {
      finished: false
    }
  })

  return prizedraw
}

const startPrizedraw = async () => {
  return await Prizedraw.create({})
}

export { currentPrizedraw, startPrizedraw }
