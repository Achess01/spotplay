class User {
  constructor({ username, email, password, roleId = null }) {
    this._id = null
    this._username = username
    this._email = email
    this._password = password
    if (roleId !== null) roleId = parseInt(roleId)
    this._roleId = roleId
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
