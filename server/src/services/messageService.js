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
    const { userId } = jwt.verify(token, process.env.SECRET)

    const message = await Message.create({
        userId,
        text
    });

    const messageObj = await Message.findOne({
        attributes: ['id', 'text', 'createdAt'],
        where: { id: message.id },
        include: {
            model: User,
            attributes: ['id', 'username', 'image']
        }
    })

    return messageObj;
}

export { getAllMessages, deleteAllMessages, createMessage }
