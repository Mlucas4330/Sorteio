import { pixPaymentConfirmation } from "../services/pixService.js"

const webhook = async (req, res) => {
  try {
    console.log(req.body)
    // await pixPaymentConfirmation(req.user.id)

    res.send(200)
  } catch (err) {
    console.log(err)
  }
}

export { webhook }