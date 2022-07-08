class GenreRouter {
  constructor({
    router,
    controller,
    response,
    httpCode,
    checkGenre,
    checkToken,
    checkEditor
  }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkGenre = checkGenre
    this._checkToken = checkToken
    this._checkEditor = checkEditor
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post(
      '/',
      this._checkToken,
      this._checkEditor,
      this._checkGenre,
      this.handlePostGenre.bind(this)
    )
    this._router.get('/', this.handleGetGenres.bind(this))
    this._router.get('/:id', this.handleGetGenre.bind(this))
    this._router.put(
      '/:id',
      this._checkToken,
      this._checkEditor,
      this.handlePutGenre.bind(this)
    )
    this._router.delete(
      '/:id',
      this._checkToken,
      this._checkEditor,
      this.handleDeleteGenre.bind(this)
    )
  }

  async handlePostGenre(req, res) {
    try {
      const genre = req.body
      const result = await this._controller.createNewGenre(genre)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  async handleGetGenres(req, res) {
    const genres = await this._controller.getGenres()
    if (genres) {
      this._response.success(req, res, genres, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleGetGenre(req, res) {
    const { id } = req.params
    const genre = await this._controller.getGenre(id)
    if (genre) {
      this._response.success(req, res, genre, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleDeleteGenre(req, res) {
    const { id } = req.params
    const deleted = await this._controller.deleteGenre(id)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handlePutGenre(req, res) {
    const { id } = req.params
    const body = req.body
    const updated = await this._controller.updateGenre(id, body)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default GenreRouter
