import { getCurrentPrizedraw, refreshLastWinner, sendEmailToWinner, startPrizedraw } from '../services/prizedrawService.js'
// import { pixSend } from '../services/pixService.js'
import Deposit from '../models/depositModel.js'
import User from '../models/userModel.js'
import { deleteAllMessages } from '../services/messageService.js'

const resetPrizedraw = async () => {
  try {
    const { prizedraw, totalAmount } = await getCurrentPrizedraw()

    const { count, rows } = await User.findAndCountAll({
      include: {
        model: Deposit,
        where: {
          prizedrawId: prizedraw.id,
          approved: true
        }
      },
      distinct: true
    })

    const i = Math.floor((Math.random() * count))

    const winner = rows[i]

    prizedraw.userId = winner.id
    prizedraw.finished = true
    prizedraw.totalAmount = totalAmount

    await deleteAllMessages()

    await prizedraw.save()

    sendEmailToWinner(winner.email, totalAmount)

    // pixSend(totalAmount, winner.pix)

    refreshLastWinner(winner.username, totalAmount)

    await startPrizedraw()

  } catch (err) {
    console.log(err)
  }
}

export { resetPrizedraw }
