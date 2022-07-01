import express from 'express'
import UserRouter from './Router.js'
import UserController from './Controller.js'
import DataJson from '../../store/Data.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import User from '../../entities/User.js'
import helpers from '../../lib/helpers.js'
import { checkUser } from './validate.js'

export const userModule = () => {
  const servicesUser = new DataJson()
  const userCotroller = new UserController(
    servicesUser,
    User,
    helpers.encryptPassword
  )
  const userRouter = new UserRouter(
    express.Router,
    userCotroller,
    response,
    HttpStatusCode,
    checkUser
  )
  return userRouter._router
}
