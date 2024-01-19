import dotenv from 'dotenv'

dotenv.config()

const pathToCertificate = process.env.NODE_ENV === 'development' ? '../certs/homologacao-490126-Sorteio.p12' : '../certs/producao-490126-Sorteio.p12'

const options = {
    sandbox: process.env.NODE_ENV === 'development' ? true : false,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    certificate: pathToCertificate
}

export default options