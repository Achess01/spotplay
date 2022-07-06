class SongRouter {
  constructor(router, controller, response, httpCode, validateCreate) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._validateCreate = validateCreate
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.get('/', this.handleGetSong.bind(this))
    this._router.post('/', this._validateCreate, this.handlePostSong.bind(this))
    this._router.get('/:idSong', this.handleGetOneSong.bind(this))
    this._router.put('/:idSong', this.handlePutOneSong.bind(this))
    this._router.delete('/:idSong', this.handleDeleteOneSong.bind(this))
  }

  handleGetSong(req, res) {
    try {
      const artistId = req.query.artistId || null
      const genreId = req.query.genreId || null
      const result = this._controller.getAllSongs({ artistId, genreId })
      if (!result) {
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

  handlePostSong(req, res) {
    const song = req.body
    const result = this._controller.createNewSong(song)
    if (result) {
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.success(
        req,
        res,
        'Error',
        this._httpCode.this._httpCode.INTERNAL_SERVER_ERROR
      )
    }
  }

  handleGetOneSong(req, res) {
    try {
      const { idSong } = req.params
      const idNumber = parseInt(idSong)
      const song = this._controller.getOneSong(idNumber)
      if (song) {
        this._response.success(req, res, song, this._httpCode.OK)
      } else {
        this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
      }
    } catch (error) {
      this._response.error(
        req,
        res,
        'Not found',
        this._httpCode.INTERNAL_SERVER_ERROR
      )
    }
  }

  handlePutOneSong(req, res) {
    const content = req.body
    const { idSong } = req.params
    const updated = this._controller.updateSong(idSong, content)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleDeleteOneSong(req, res) {
    const { idSong } = req.params
    const deleted = this._controller.deleteSong(idSong)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default SongRouter
