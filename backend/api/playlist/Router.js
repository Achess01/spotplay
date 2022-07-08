class PlaylistRouter {
  constructor({
    router,
    controller,
    response,
    httpCode,
    checkPlaylist,
    checkToken
  }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkPlaylist = checkPlaylist
    this._checkToken = checkToken
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post(
      '/',
      this._checkToken,
      this._checkPlaylist,
      this.handlePostPlaylist.bind(this)
    )
    this._router.post(
      '/:id/:idSong',
      this._checkToken,
      this.handleAddSong.bind(this)
    )
    this._router.get('/', this.handleGetPlaylists.bind(this))
    this._router.get('/:id', this.handleGetPlaylist.bind(this))
    this._router.put(
      '/:id',
      this._checkToken,
      this.handlePutPlaylist.bind(this)
    )
    this._router.delete(
      '/:id',
      this._checkToken,
      this.handleDeletePlaylist.bind(this)
    )
  }

  async handleAddSong(req, res) {
    const { id, idSong } = req.params
    const added = await this._controller.addSong(id, idSong)
    if (added) {
      this._response.success(req, res, added, this._httpCode.CREATED)
    } else {
      this._response.error(
        req,
        res,
        'Song or playlist not found',
        this._httpCode.NOT_FOUND
      )
    }
  }

  async handlePostPlaylist(req, res) {
    try {
      const playlist = req.body
      const result = await this._controller.createNewPlaylist(playlist)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  async handleGetPlaylists(req, res) {
    const idOwner = req.query.idOwner || null
    const playlists = await this._controller.getPlaylists(idOwner)
    if (playlists) {
      this._response.success(req, res, playlists, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleGetPlaylist(req, res) {
    const { id } = req.params
    const playlist = await this._controller.getPlaylist(id)
    if (playlist) {
      this._response.success(req, res, playlist, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleDeletePlaylist(req, res) {
    const { id } = req.params
    const deleted = await this._controller.deletePlaylist(id)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handlePutPlaylist(req, res) {
    const { id } = req.params
    const body = req.body
    const updated = await this._controller.updatePlaylist(id, body)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default PlaylistRouter
