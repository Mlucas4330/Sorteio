import { currentPrizedraw, startPrizedraw } from '../services/prizedrawService.js'
import { pixSend }  from '../services/pixService.js'
import Deposit from '../models/depositModel.js'
import User from '../models/userModel.js'
import { deleteAllMessages } from '../services/messageService.js'

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

    await deleteAllMessages()

  } catch (error) {
    console.log(error)
  }
}

export { resetPrizedraw }
