import { response } from '../response/response.js'
import { validationResult } from 'express-validator'
import helpers from '../lib/helpers.js'
import { HttpStatusCode } from '../response/httpCode.js'

export const resultHandler = (req, res, next) => {
  try {
    validationResult(req).throw()
    next()
  } catch (error) {
    const message = error.array().reduce((msg, err) => {
      if (msg) {
        msg = `${msg}, ${err.msg}`
        return msg
      } else {
        return err.msg
      }
    }, '')

    response.error(req, res, message, 400)
  }
}

export const checkToken = async (req, res, next) => {
  const token = req.headers['x-access-token'] || ''
  if (token) {
    try {
      const verify = await helpers.verifyToken(token)
      if (verify) {
        const { id, role } = verify
        res.locals.user = { id, role }
        // Petición con el id para obtener rol
        next()
      } else {
        response.error(req, res, 'Invalid token', HttpStatusCode.UNAUTHORIZED)
      }
    } catch (error) {
      console.error(error)
      response.error(req, res, 'Expired token', HttpStatusCode.UNAUTHORIZED)
    }
  } else {
    response.error(req, res, 'Not token provided', HttpStatusCode.BAD_REQUEST)
  }
}

export const checkEditor = (req, res, next) => {
  const { role } = res.locals.user
  if (role && (role._name === 'Editor' || role._name === 'Admin')) {
    next()
  } else {
    response.error(req, res, 'You need to be an editor')
  }
}

export const checkAdmin = (req, res, next) => {
  const { role } = res.locals.user
  if (role && role._name === 'Admin') {
    next()
  } else {
    response.error(req, res, 'You need to be an admin')
  }
}
