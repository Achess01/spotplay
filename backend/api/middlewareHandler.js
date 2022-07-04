import { response } from '../response/response.js'
import { validationResult } from 'express-validator'

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
