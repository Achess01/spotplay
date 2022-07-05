import express from 'express'
import SongRouter from './Router.js'
import SongController from './Controller.js'
import DataJson from '../../store/Data.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Song from '../../entities/Song.js'
import { validateCreate } from './validate.js'

export const songModule = () => {
  const servicesSong = new DataJson()
  const songCotroller = new SongController(servicesSong, Song)
  const songRouter = new SongRouter(
    express.Router,
    songCotroller,
    response,
    HttpStatusCode,
    validateCreate
  )
  return songRouter._router
}
