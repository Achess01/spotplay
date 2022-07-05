import express from 'express'
import { songModule } from './song/index.js'
import { userModule } from './user/index.js'
import { artistModule } from './artist/index.js'
import cors from 'cors'
import morgan from 'morgan'

class Server {
  constructor({ port, hostname, name }) {
    this._app = express()
    this._port = port
    this._hostname = hostname
    this._name = name
    this.setMiddlewares()
    this.setRoutes()
  }

  setMiddlewares() {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  setRoutes() {
    this._app.use('/api/v1/song', songModule())
    this._app.use('/api/v1/user', userModule())
    this._app.use('/api/v1/artist', artistModule())
  }

  start() {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(
        `${this._name} is running on http://${this._hostname}:${this._port}`
      )
    })
  }
}

export default Server
