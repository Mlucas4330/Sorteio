import Message from '../models/messageModel.js'
import User from '../models/userModel.js'

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

export { getAllMessages, deleteAllMessages }
