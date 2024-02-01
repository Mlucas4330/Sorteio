import { pixPaymentConfirmation } from "../services/pixService"

const webhook = async (req, res) => {
  try {
    await pixPaymentConfirmation(req.user.id)
  } catch (err) {
    console.log(err)
  }
}

export { webhook }