class RoleController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  getRoles() {
    const roles = this._service.getDataFromTable('role')
    return roles
  }

  createNewRole(role) {
    const newRole = new this._entity(role)
    const response = this._service.save('role', newRole)
    return response
  }

  getRole(id) {
    const role = this._service.getEntity('role', id)
    return role
  }

  updateRole(id, content) {
    const updated = this._service.update('role', id, content)
    return updated
  }

  deleteRole(id) {
    const deleted = this._service.delete('role', id)
    return deleted
  }
}

export default RoleController
