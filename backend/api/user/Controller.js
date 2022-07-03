class UserController {
  constructor(service, entity, hashPassowrd) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassowrd
  }

  getUsers() {
    const users = this._service.getDataFromTable('user')
    return users
  }

  createNewUser(user) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashPassword)
    const response = this._service.save('user', newUser)
    return response
  }

  getUser(id) {
    const user = this._service.getEntity('user', id)
    return user
  }

  updateUser(id, content) {
    const updated = this._service.update('user', id, content)
    return updated
  }

  deleteUser(id) {
    const deleted = this._service.delete('user', id)
    return deleted
  }
}

export default UserController
