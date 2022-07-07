import express from 'express'
import ArtistRouter from './Router.js'
import ArtistController from './Controller.js'
// import DataJson from '../../store/Data.js'
import DBMongo from '../../store/DBMongo.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Artist from '../../entities/Artist.js'
import { validateCreate } from './validate.js'

export const artistModule = () => {
  // const servicesArtist = new DataJson()
  const servicesArtist = new DBMongo()
  const artistCotroller = new ArtistController(servicesArtist, Artist)
  const artistRouter = new ArtistRouter({
    router: express.Router,
    controller: artistCotroller,
    response,
    httpCode: HttpStatusCode,
    checkArtist: validateCreate
  })
  return artistRouter._router
}
