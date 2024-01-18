import Message from '../models/messageModel.js'

const deleteAllMessages = async () => {
    try {
        await Message.destroy({
            where: {},
            truncate: true
        })
    } catch(err){
        console.log(err)
    }
}

export { deleteAllMessages }
