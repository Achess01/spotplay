class Auth {
  constructor({ state, username, email, token, message }) {
    this._auth = state || false
    this._username = username || ''
    this._email = email || ''
    this._token = token || ''
    this._message = message || ''
  }
}

export default Auth
