class SongRouter {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.get('/:idSong', this.handleGetOneSong.bind(this))
    this._router.get('/', this.handleGetSong.bind(this))
    this._router.post('/', this.handlePostSong.bind(this))
    this._router.delete('/', this.handleDeleteSong.bind(this))
    this._router.put('/', this.handlePutSong.bind(this))
  }

  handleGetSong(req, res) {
    try {
      const result = this._controller.getAllSongs()
      if (result.length === 0) {
        this._response.success(
          req,
          res,
          'No hay canciones',
          this._httpCode.NOT_FOUND
        )
      } else {
        this._response.success(req, res, result, this._httpCode.OK)
      }
    } catch (error) {
      this._response.error(
        req,
        res,
        error,
        this._httpCode.INTERNAL_SERVER_ERROR
      )
    }
  }

  handleGetOneSong(req, res) {
    try {
      const { idSong } = req.params
      const idNumber = parseInt(idSong)
      const song = this._controller.getOneSong(idNumber)
      if (Object.keys(song).length > 0) {
        this._response.success(req, res, song, this._httpCode.OK)
      } else {
        this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(req, res, 'Not found', this._httpCode.INTERNAL_SERVER_ERROR)
    }
  }

  handlePostSong(req, res) {
    const song = req.body
    const result = this._controller.createNewSong(song)
    console.log(result)
    console.log(req.method)
    this._response.success(req, res, 'Canción creada', this._httpCode.OK)
  }

  handleDeleteSong(req, res) {
    console.log(req.method)
    res.send('Soy la ruta delete /song')
  }

  handlePutSong(req, res) {
    console.log(req.method)
    res.send('Soy la ruta put /song')
  }
}

export default SongRouter
