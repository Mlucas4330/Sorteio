import dotenv from 'dotenv'

dotenv.config()

const options = {
    sandbox: process.env.NODE_ENV === 'development',
    client_id: process.env.NODE_ENV === 'development' ? process.env.DEV_CLIENT_ID : process.env.PROD_CLIENT_ID,
    client_secret: process.env.NODE_ENV === 'development' ? process.env.DEV_CLIENT_SECRET : process.env.PROD_CLIENT_SECRET,
    certificate: process.env.NODE_ENV === 'development' ? './src/certs/homologacao-490126-Sorteio.p12' : './src/certs/producao-490126-Sorteio.p12',
};

export default options