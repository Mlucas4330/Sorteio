import verify from 'jsonwebtoken'

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return next(new Error('Não está autenticado'))
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return next(new Error('Não há token'))
    }

    const payload = verify(token, process.env.SECRET)

    req.user = payload.user

    next()
  } catch (err) {
    console.log(err)
  }
}

export { verifyJWT }
