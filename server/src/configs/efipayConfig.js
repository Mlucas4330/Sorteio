import dotenv from 'dotenv'

dotenv.config()

const config = {
    production: {
        sandbox: true,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        certificate: './src/certs/producao-490126-Sorteio.p12'
    },
    development: {
        sandbox: false,
        client_id: process.env.DEV_CLIENT_ID,
        client_secret: process.env.DEV_CLIENT_SECRET,
        certificate: './src/certs/homologacao-490126-Sorteio.p12'
    }
}

const options = process.env.NODE_ENV === 'development' ? config.development : config.production

export default options