import Deposit from '../models/depositModel.js'
import Prizedraw from '../models/prizedrawModel.js'
import { Sequelize } from 'sequelize'
import nodemailer from 'nodemailer'
import { Op } from 'sequelize'
import User from '../models/userModel.js'
import { io } from '../sockets/index.js'

const getCurrentPrizedraw = async () => {
  const [prizedraw, _] = await Prizedraw.findOrCreate({
    where: {
      finished: false
    }
  })

  const deposit = await Deposit.findOne({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
    ],
    where: {
      prizedrawId: prizedraw.id,
      approved: true
    }
  })

  return { prizedraw, totalAmount: deposit.get('totalAmount') }
}

const startPrizedraw = async () => {
  await Prizedraw.create()
}

const getTaxedValue = (amount) => {
  return (Number(amount) - (Number(process.env.TAX) / 100)).toFixed(2);
}

const sendEmailToWinner = (email, totalAmount) => {
  const floatvalue = parseFloat(getTaxedValue(totalAmount)) || 0;
  const totalAmountFormatted = floatvalue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Você é o vencedor!',
    text: `Parabéns! Você foi o vencedor do sorteio atual e acabou de ganhar ${totalAmountFormatted}. Você receberá o valor em até 24 horas através do PIX cadastrado em sua conta!`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return err
    }
  });
}

const getLastWinner = async () => {
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  const yesterday = new Date(currentDate);

  yesterday.setDate(currentDate.getDate() - 1);

  yesterday.setHours(0, 0, 0, 0);

  return await Prizedraw.findOne({
    where: {
      createdAt: {
        [Op.between]: [yesterday, currentDate],
      },
    },
    include: {
      model: User,
      required: true
    }
  });
}

const refreshLastWinner = (username, totalAmount) => {
  io.emit('last winner', { username, totalAmount })
}

export { getCurrentPrizedraw, startPrizedraw, sendEmailToWinner, getLastWinner, refreshLastWinner }
