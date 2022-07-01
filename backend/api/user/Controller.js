class UserController {
  constructor(service, entity, hashPassowrd) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassowrd
  }

  getUsers() {
    return 'all users'
  }

  createNewUser(user) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashPassword)
    const response = this._service.save('user', newUser)
    return response
  }

  updateUser(user) {
    console.log(user)
    return 'user updated'
  }

  deleteUser(id) {
    console.log(id)
    return 'user deleted'
  }
}

export default UserController
