import express from 'express'
import GenreRouter from './Router.js'
import GenreController from './Controller.js'
import DataJson from '../../store/Data.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Genre from '../../entities/Genre.js'
import { validateCreate } from './validate.js'

export const genreModule = () => {
  const servicesGenre = new DataJson()
  const genreCotroller = new GenreController(servicesGenre, Genre)
  const genreRouter = new GenreRouter({
    router: express.Router,
    controller: genreCotroller,
    response,
    httpCode: HttpStatusCode,
    checkGenre: validateCreate
  })
  return genreRouter._router
}
