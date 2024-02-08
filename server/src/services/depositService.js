import Deposit from "../models/depositModel.js"
import User from "../models/userModel.js"
import { getCurrentPrizedraw } from "./prizedrawService.js"

const getAllDeposits = async () => {
  const { prizedraw } = await getCurrentPrizedraw()

  return await Deposit.findAll({
    where: {
      prizedrawId: prizedraw.id,
      approved: true
    },
    include: {
      model: User,
      attributes: ['username']
    },
    order: [['createdAt', 'DESC']],
    limit: 5
  })
}

const getDepositByTxidAndUpdate = async (txid) => {
  const deposit = await Deposit.findOne({
    where: { txid },
    include: {
      model: User,
      attributes: ['username']
    }
  })

  deposit.approved = true;

  await deposit.save()

  return deposit
}

const createDeposit = async (amount, userId, txid) => {
  const { prizedraw } = await getCurrentPrizedraw()

  await Deposit.create({
    userId,
    prizedrawId: prizedraw.id,
    amount,
    txid
  })
}

export { getAllDeposits, createDeposit, getDepositByTxidAndUpdate }