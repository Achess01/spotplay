import Auth from '../../entities/Auth.js'
import AuthRoute from './Routes.js'
import AuthController from './Controller.js'
import DataJson from '../../store/Data.js'
import helpers from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import { Router } from 'express'

export const authModule = () => {
  const authServices = new DataJson()
  const authController = new AuthController({
    services: authServices,
    entity: Auth,
    comparePassword: helpers.comparePassword,
    generateToken: helpers.generateToken
  })
  const authRoute = new AuthRoute(
    Router,
    authController,
    response,
    HttpStatusCode
  )

  return authRoute._router
}
