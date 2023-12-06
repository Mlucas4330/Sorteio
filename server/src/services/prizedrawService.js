const Deposit = require('../models/depositModel')
const Prizedraw = require('../models/prizedrawModel')

const currentPrizedraw = async () => {
  const prizedraw = await Prizedraw.findOne({
    where: {
      finished: false
    },
    include: Deposit
  })

  return prizedraw
}

const startPrizedraw = async () => {
  return await Prizedraw.create({})
}

module.exports = { currentPrizedraw, startPrizedraw }
