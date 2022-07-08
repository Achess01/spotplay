import express from 'express'
import RoleRouter from './Router.js'
import RoleController from './Controller.js'
// import DataJson from '../../store/Data.js'
// import DataPostgresql from '../../store/DbPostgresql.js'
import DBMongo from '../../store/DBMongo.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Role from '../../entities/Role.js'
import { validateCreate } from './validate.js'
import { checkToken, checkAdmin } from '../middlewareHandler.js'

export const roleModule = () => {
  // const servicesRole = new DataJson()
  // const servicesRole = new DataPostgresql()
  const servicesRole = new DBMongo()
  const roleCotroller = new RoleController(servicesRole, Role)
  const roleRouter = new RoleRouter({
    router: express.Router,
    controller: roleCotroller,
    response,
    httpCode: HttpStatusCode,
    checkRole: validateCreate,
    checkToken,
    checkAdmin
  })
  return roleRouter._router
}
