class ArtistRouter {
  constructor({ router, controller, response, httpCode, checkArtist }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkArtist = checkArtist
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post('/', this._checkArtist, this.handlePostArtist.bind(this))
    this._router.get('/', this.handleGetArtists.bind(this))
    this._router.get('/:id', this.handleGetArtist.bind(this))
    this._router.put('/:id', this.handlePutArtist.bind(this))
    this._router.delete('/:id', this.handleDeleteArtist.bind(this))
  }

  handlePostArtist(req, res) {
    try {
      const artist = req.body
      const result = this._controller.createNewArtist(artist)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  handleGetArtists(req, res) {
    const artists = this._controller.getArtists()
    if (artists) {
      this._response.success(req, res, artists, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleGetArtist(req, res) {
    const { id } = req.params
    const artist = this._controller.getArtist(id)
    if (artist) {
      this._response.success(req, res, artist, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleDeleteArtist(req, res) {
    const { id } = req.params
    const deleted = this._controller.deleteArtist(id)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handlePutArtist(req, res) {
    const { id } = req.params
    const body = req.body
    const updated = this._controller.updateArtist(id, body)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default ArtistRouter
