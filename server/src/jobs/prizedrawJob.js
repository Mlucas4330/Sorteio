const { currentPrizedraw, startPrizedraw } = require('../services/prizedrawService')
const { pixSend } = require('../services/pixService')
const Deposit = require('../models/depositModel')
const User = require('../models/userModel')

const resetPrizedraw = async () => {
  try {
    const prizedraw = await currentPrizedraw()

    const { count, rows } = await User.findAndCountAll({
      include: {
        model: Deposit,
        where: { prizedrawId: prizedraw.id }
      },
      distinct: true
    })

    const i = Math.floor(Math.random() * count)
    const winner = rows[i]

    prizedraw.userId = winner.id
    prizedraw.finished = true

    pixSend(prizedraw.totalAmount, winner.pix)

    await prizedraw.save()

    await startPrizedraw()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { resetPrizedraw }
