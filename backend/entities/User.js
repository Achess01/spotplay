class User {
  constructor({ username, email, password }) {
    this._id = null
    this._username = username
    this._email = email
    this._password = password
  }

  encryptPassword(password, hashPassword) {
    this._password = hashPassword(password)
  }
}

/* export class UserPlaylist {
  constructor({ idUser, idPlaylist }) {
    this._id = null
    this._idUser = idUser
    this._idPlaylist = idPlaylist
  }
} */

export default User
