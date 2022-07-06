class RoleRouter {
  constructor({ router, controller, response, httpCode, checkRole }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkRole = checkRole
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post('/', this._checkRole, this.handlePostRole.bind(this))
    this._router.get('/', this.handleGetRoles.bind(this))
    this._router.get('/:id', this.handleGetRole.bind(this))
    this._router.put('/:id', this.handlePutRole.bind(this))
    this._router.delete('/:id', this.handleDeleteRole.bind(this))
  }

  async handlePostRole(req, res) {
    try {
      const role = req.body
      const result = await this._controller.createNewRole(role)
      this._response.success(req, res, result, this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  async handleGetRoles(req, res) {
    const roles = await this._controller.getRoles()
    if (roles) {
      this._response.success(req, res, roles, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleGetRole(req, res) {
    const { id } = req.params
    const role = await this._controller.getRole(id)
    if (role) {
      this._response.success(req, res, role, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleDeleteRole(req, res) {
    const { id } = req.params
    const deleted = await this._controller.deleteRole(id)
    if (deleted) {
      this._response.success(req, res, deleted, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handlePutRole(req, res) {
    const { id } = req.params
    const body = req.body
    const updated = await this._controller.updateRole(id, body)
    if (updated) {
      this._response.success(req, res, updated, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default RoleRouter
