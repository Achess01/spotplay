class UserRouter {
  constructor({
    router,
    controller,
    response,
    httpCode,
    checkUser,
    checkUpdate
  }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkUser = checkUser
    this._checkUpdate = checkUpdate
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post('/signup', this._checkUser, this.handleSignUp.bind(this))
    this._router.get('/', this.handleGetUsers.bind(this))
    this._router.get('/:id', this.handleGetUser.bind(this))
    this._router.delete('/:id', this.handleDeleteUser.bind(this))
    this._router.put('/:id', this._checkUpdate, this.handlePutUser.bind(this))
  }

  handleSignUp(req, res) {
    try {
      const user = req.body
      const result = this._controller.createNewUser(user)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  handleGetUsers(req, res) {
    const users = this._controller.getUsers()
    if (users) {
      this._response.success(req, res, users, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleGetUser(req, res) {
    const { id } = req.params
    const user = this._controller.getUser(id)
    if (user) {
      this._response.success(req, res, user, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handleDeleteUser(req, res) {
    const { id } = req.params
    const deleted = this._controller.deleteUser(id)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  handlePutUser(req, res) {
    const { id } = req.params
    const body = req.body
    const updated = this._controller.updateUser(id, body)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default UserRouter
