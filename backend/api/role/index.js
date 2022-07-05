import express from 'express'
import RoleRouter from './Router.js'
import RoleController from './Controller.js'
import DataJson from '../../store/Data.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Role from '../../entities/Role.js'
import { validateCreate } from './validate.js'

export const roleModule = () => {
  const servicesRole = new DataJson()
  const roleCotroller = new RoleController(servicesRole, Role)
  const roleRouter = new RoleRouter({
    router: express.Router,
    controller: roleCotroller,
    response,
    httpCode: HttpStatusCode,
    checkRole: validateCreate
  })
  return roleRouter._router
}
