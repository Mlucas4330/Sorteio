import jwt from 'jsonwebtoken'

const verifyJWT = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return next('Não está autenticado')
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return next('Não há token')
    }

    const { userId } = jwt.verify(token, process.env.SECRET)

    req.userId = userId

    next()
  } catch (err) {
    console.log(err)
  }
}

export { verifyJWT }
