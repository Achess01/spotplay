import { HttpStatusCode } from './httpCode.js'

export const response = {
  success: function (req, res, message, status) {
    const statusCode = status || HttpStatusCode.OK
    const statusMessage = message || 'Success'

    res.status(statusCode).send({
      request: req.method + ' ' + req.url,
      error: false,
      status: statusCode,
      body: statusMessage
    })
  },
  error: function (req, res, message, status) {
    const statusCode = status || HttpStatusCode.INTERNAL_SERVER_ERROR
    const statusMessage = message || 'Internal Server Error'
    res.status(statusCode).send({
      request: req.method + ' ' + req.url,
      error: true,
      status: statusCode,
      body: statusMessage
    })
  }

}
