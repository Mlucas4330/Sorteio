const path = require('path')
require('dotenv').config()

module.exports = {
  sandbox: false,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  certificate: path.join(__dirname, '../certs/producao-490126-Sorteio.p12')
}
