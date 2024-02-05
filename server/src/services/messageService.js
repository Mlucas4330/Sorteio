import Message from '../models/messageModel.js'
import User from '../models/userModel.js'

const getAllMessages = async () => {
    try {
        return await Message.findAll({
            include: User
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteAllMessages = async () => {
    try {
        await Message.destroy({
            where: {},
            truncate: true
        })
    } catch (err) {
        console.log(err)
    }
}

export { getAllMessages, deleteAllMessages }
