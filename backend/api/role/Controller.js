class RoleController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  async getRoles() {
    const roles = await this._service.getDataFromTable('roles')
    return roles
  }

  async createNewRole(role) {
    const newRole = new this._entity(role)
    const { _name, _description } = newRole
    const response = await this._service.save('roles', { _name, _description })
    return response
  }

  async getRole(id) {
    const role = await this._service.getEntity('roles', id)
    return role
  }

  async updateRole(id, content) {
    const updated = await this._service.update('roles', id, content)
    return updated
  }

  async deleteRole(id) {
    const deleted = await this._service.delete('roles', id)
    return deleted
  }
}

export default RoleController
