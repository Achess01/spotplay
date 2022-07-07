class UserController {
  constructor(service, entity, hashPassowrd, transport, emailDir) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassowrd
    this._transport = transport
    this._emailDir = emailDir
  }

  sendEmail(to, subject, text) {
    const mailDetails = {
      from: this._emailDir,
      to,
      subject,
      text
    }

    this._transport.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`Email sent to ${to}`)
      }
    })
  }

  async getUsers() {
    const users = await this._service.getDataFromTable('users')
    return users
  }

  async createNewUser(user) {
    const newUser = new this._entity(user)
    newUser.encryptPassword(user.password, this._hashPassword)
    const response = await this._service.save('users', {
      _username: newUser._username,
      _email: newUser._email,
      _password: newUser._password,
      _roleid: newUser._roleId
    })
    return response
  }

  async getUser(id) {
    const user = await this._service.getEntity('users', id)
    return user
  }

  async updateUser(id, content) {
    const { _password } = content
    if (_password) {
      const newPass = this._hashPassword(_password)
      content._password = newPass
    }
    const updated = await this._service.update('users', id, content)
    return updated
  }

  async deleteUser(id) {
    const deleted = await this._service.delete('users', id)
    return deleted
  }
}

export default UserController
