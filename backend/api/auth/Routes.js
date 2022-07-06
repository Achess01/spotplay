export default class AuthRoute {
  constructor(router, controller, response, httpCode) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this.registerRoutes()
  }

  registerRoutes() {
    this._router.post('/signin', this.handleSignIn.bind(this))
  }

  async handleSignIn(req, res) {
    try {
      const auth = await this._controller.userAuthentication(req.body)
      if (auth._auth) {
        this._response.success(req, res, auth, this._httpCode.OK)
      } else {
        this._response.success(req, res, auth, this._httpCode.BAD_REQUEST)
      }
    } catch (error) {
      this._response.error(req, res, error.message, this._httpCode.BAD_REQUEST)
    }
  }
}
