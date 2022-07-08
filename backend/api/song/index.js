import express from 'express'
import SongRouter from './Router.js'
import SongController from './Controller.js'
// import DataJson from '../../store/Data.js'
// import DataPostgresql from '../../store/DbPostgresql.js'
import DBMongo from '../../store/DBMongo.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Song from '../../entities/Song.js'
import { validateCreate } from './validate.js'
import { checkToken, checkEditor } from '../middlewareHandler.js'

export const songModule = () => {
  // const servicesSong = new DataJson()
  // const servicesSong = new DataPostgresql()
  const servicesSong = new DBMongo()
  const songCotroller = new SongController(servicesSong, Song)
  const songRouter = new SongRouter(
    express.Router,
    songCotroller,
    response,
    HttpStatusCode,
    validateCreate,
    checkToken,
    checkEditor
  )
  return songRouter._router
}
