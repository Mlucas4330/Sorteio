import { getCurrentPrizedraw, refreshLastWinner, sendEmailToWinner, startPrizedraw } from '../services/prizedrawService.js'
// import { pixSend } from '../services/pixService.js'
import Deposit from '../models/depositModel.js'
import User from '../models/userModel.js'
import { deleteAllMessages } from '../services/messageService.js'

const resetPrizedraw = async () => {
  try {
    const prizedraw = await getCurrentPrizedraw()

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

    if (count > 0 && count !== null && count !== undefined) {
      const i = Math.floor((Math.random() * count))

      const winner = rows[i]

      prizedraw.userId = winner.id

      sendEmailToWinner(winner.email, prizedraw.totalAmount)

      // pixSend(totalAmount, winner.pix)

      refreshLastWinner(winner.username, prizedraw.totalAmount)
    }

    prizedraw.finished = true

    await prizedraw.save()

    await deleteAllMessages()

    await startPrizedraw()

  } catch (err) {
    console.log(err)
  }
}

export { resetPrizedraw }
