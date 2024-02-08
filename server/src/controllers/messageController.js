import { getAllMessages } from "../services/messageService.js"

const index = async (_req, res) => {
  try {
    const messages = await getAllMessages()

    res.send({
      code: 200,
      data: { messages },
      message: 'Mensagens encontradas com sucesso'
    })
  } catch (err) {
    console.log(err)
  }
}

export { index }