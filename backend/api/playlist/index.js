import express from 'express'
import PlaylistRouter from './Router.js'
import PlaylistController from './Controller.js'
// import DataJson from '../../store/Data.js'
// import DataPostgresql from '../../store/DbPostgresql.js'
import DBMongo from '../../store/DBMongo.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Playlist, { PlaylistSong } from '../../entities/Playlist.js'
import { validateCreate } from './validate.js'

export const playlistModule = () => {
  // const servicesPlaylist = new DataJson()
  // const servicesPlaylist = new DataPostgresql()
  const servicesPlaylist = new DBMongo()
  const playlistCotroller = new PlaylistController(
    servicesPlaylist,
    Playlist,
    PlaylistSong
  )
  const playlistRouter = new PlaylistRouter({
    router: express.Router,
    controller: playlistCotroller,
    response,
    httpCode: HttpStatusCode,
    checkPlaylist: validateCreate
  })
  return playlistRouter._router
}
