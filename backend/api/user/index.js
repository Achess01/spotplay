import express from 'express'
import UserRouter from './Router.js'
import UserController from './Controller.js'
// import DataJson from '../../store/Data.js'
// import DataPostgresql from '../../store/DbPostgresql.js'
import DBMongo from '../../store/DBMongo.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import User from '../../entities/User.js'
import helpers from '../../lib/helpers.js'
import { validateCreateUser } from './validate.js'
import { checkToken } from '../middlewareHandler.js'

export const userModule = () => {
  // const servicesUser = new DataJson()
  // const servicesUser = new DataPostgresql()
  const servicesUser = new DBMongo()
  const userCotroller = new UserController(
    servicesUser,
    User,
    helpers.encryptPassword,
    helpers.createTransport(),
    helpers.emailData.email
  )
  const userRouter = new UserRouter({
    router: express.Router,
    controller: userCotroller,
    response,
    httpCode: HttpStatusCode,
    checkUser: validateCreateUser,
    checkToken
  })
  return userRouter._router
}
