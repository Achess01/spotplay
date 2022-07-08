import express from 'express'
import GenreRouter from './Router.js'
import GenreController from './Controller.js'
// import DataJson from '../../store/Data.js'
// import DataPostgresql from '../../store/DbPostgresql.js'
import DBMongo from '../../store/DBMongo.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Genre from '../../entities/Genre.js'
import { validateCreate } from './validate.js'
import { checkToken, checkEditor } from '../middlewareHandler.js'

export const genreModule = () => {
  // const servicesGenre = new DataJson()
  // const servicesGenre = new DataPostgresql()
  const servicesGenre = new DBMongo()
  const genreCotroller = new GenreController(servicesGenre, Genre)
  const genreRouter = new GenreRouter({
    router: express.Router,
    controller: genreCotroller,
    response,
    httpCode: HttpStatusCode,
    checkGenre: validateCreate,
    checkToken,
    checkEditor
  })
  return genreRouter._router
}
