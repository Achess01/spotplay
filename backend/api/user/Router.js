class UserRouter {
  constructor(router, controller, response, httpCode, checkUser) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._checkUser = checkUser
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post(
      '/signup',
      this._checkUser,
      this.handleSignUp.bind(this)
    )
    this._router.get('/', this.handleGetUser.bind(this))
    // this._router.post('/', this.handlePostUser.bind(this))
    this._router.delete('/', this.handleDeleteUser.bind(this))
    this._router.put('/', this.handlePutUser.bind(this))
  }

  handleSignIn(req, res) {
    // const { password, username } = req.body
  }

  handleGetUser(req, res) {
    console.log(req.method)
    res.send('Soy la ruta get /User')
  }

  handleSignUp(req, res) {
    try {
      const user = req.body
      const result = this._controller.createNewUser(user)
      console.log(result)
      this._response.success(req, res, 'Usuario creado', this._httpCode.CREATED)
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }

  handleDeleteUser(req, res) {
    console.log(req.method)
    res.send('Soy la ruta delete /User')
  }

  handlePutUser(req, res) {
    console.log(req.method)
    res.send('Soy la ruta put /User')
  }
}

export default UserRouter
