class PlaylistRouter {
  constructor({ router, controller, response, httpCode, checkPlaylist }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkPlaylist = checkPlaylist
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post(
      '/',
      this._checkPlaylist,
      this.handlePostPlaylist.bind(this)
    )
    this._router.get('/', this.handleGetPlaylists.bind(this))
    this._router.post('/:id/:idSong', this.handleAddSong.bind(this))
    this._router.get('/:id', this.handleGetPlaylist.bind(this))
    this._router.put('/:id', this.handlePutPlaylist.bind(this))
    this._router.delete('/:id', this.handleDeletePlaylist.bind(this))
  }

  handleAddSong(req, res) {
    const { id, idSong } = req.params
    const added = this._controller.addSong(id, idSong)
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

  handlePostPlaylist(req, res) {
    try {
      const playlist = req.body
      const result = this._controller.createNewPlaylist(playlist)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  handleGetPlaylists(req, res) {
    const idOwner = req.query.idOwner || null
    const playlists = this._controller.getPlaylists(idOwner)
    if (playlists) {
      this._response.success(req, res, playlists, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleGetPlaylist(req, res) {
    const { id } = req.params
    const playlist = this._controller.getPlaylist(id)
    if (playlist) {
      this._response.success(req, res, playlist, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleDeletePlaylist(req, res) {
    const { id } = req.params
    const deleted = this._controller.deletePlaylist(id)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handlePutPlaylist(req, res) {
    const { id } = req.params
    const body = req.body
    const updated = this._controller.updatePlaylist(id, body)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default PlaylistRouter
