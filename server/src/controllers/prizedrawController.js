const { currentPrizedraw } = require('../services/prizedrawService')

const index = async (_req, res) => {
  try {
    const prizedraw = await currentPrizedraw()

    const amount = prizedraw.Deposits.reduce((acc, cur) => acc + cur, 0)

    res.json({ code: 200, data: amount })
  } catch (err) {
    res.json({ message: err, data: {} })
  }
}

module.exports = { index }
