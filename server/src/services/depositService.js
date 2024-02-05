import Deposit from "../models/depositModel.js"
import User from "../models/userModel.js"
import { getCurrentPrizedraw } from "./prizedrawService.js"

const getAllDeposits = async () => {
  try {
    const { prizedraw } = await getCurrentPrizedraw()
    return await Deposit.findAll({
      where: {
        prizedrawId: prizedraw.id
      },
      include: {
        model: User,
        attributes: ['username']
      },
      order: [['createdAt', 'DESC']],
      limit: 5
    })
  } catch (err) {
    console.log(err)
  }
}

export { getAllDeposits }