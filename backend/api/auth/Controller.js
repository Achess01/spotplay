export default class AuthController {
  constructor({ services, entity, comparePassword, generateToken }) {
    this._services = services
    this._entity = entity
    this._comparePassword = comparePassword
    this._generateToken = generateToken
  }

  async userAuthentication(user) {
    try {
      const founded = await this._services.getEntityByAttribute(
        'users',
        '_username',
        user.username
      )
      if (!founded) return this.wrongCredentials()
      const result = this._comparePassword(user.password, founded._password)
      if (result) {
        const token = this._generateToken(founded._id)
        return this.loginSuccess(founded, token)
      }
      return this.wrongCredentials()
    } catch (error) {
      return new Error(error)
    }
  }

  wrongCredentials() {
    return new this._entity({
      state: false,
      message: 'Wrong credentials'
    })
  }

  loginSuccess(founded, token) {
    return new this._entity({
      state: true,
      username: founded._username,
      email: founded._email,
      token,
      message: 'Login successful'
    })
  }
}
