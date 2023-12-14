import dotenv from 'dotenv'

dotenv.config()

const options = {
    sandbox: false,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    certificate: ('../certs/producao-490126-Sorteio.p12')
}

export default options