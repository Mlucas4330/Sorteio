import Message from '../models/messageModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const getAllMessages = async () => {
    return await Message.findAll({
        include: User
    })
}

const deleteAllMessages = async () => {
    await Message.destroy({
        where: {},
        truncate: true
    })
}

const createMessage = async ({ text, token }) => {
    const { user } = jwt.verify(token, process.env.SECRET)

    const message = await Message.create({
        userId: user.id,
        text,
        token
    });

    const messageObj = await Message.findOne({
        where: { id: message.id },
        include: User
    })

    return messageObj;
}

export { getAllMessages, deleteAllMessages, createMessage }
