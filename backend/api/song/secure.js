import helpers from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'

const checkToken = async (req, res, next) => {
  const token = req.headers['x-access-token'] || ''
  console.log(token)
  if (token) {
    try {
      const verify = await helpers.verifyToken(token)
      if (verify) {
        // const idUser = verify.id
        // Petición con el id para obtener rol
        next()
      } else {
        response.error(req, res, 'Invalid token', HttpStatusCode.UNAUTHORIZED)
      }
    } catch (error) {
      response.error(req, res, 'Expired token', HttpStatusCode.UNAUTHORIZED)
    }
  } else {
    response.error(req, res, 'Not token provided', HttpStatusCode.BAD_REQUEST)
  }
}

export default checkToken
