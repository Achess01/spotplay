class GenreController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  async getGenres() {
    const genres = await this._service.getDataFromTable('genres')
    return genres
  }

  async createNewGenre(genre) {
    const newGenre = new this._entity(genre)
    const { _name, _description } = newGenre
    const response = await this._service.save('genres', { _name, _description })
    return response
  }

  async getGenre(id) {
    const genre = await this._service.getEntity('genres', id)
    return genre
  }

  async updateGenre(id, content) {
    const updated = await this._service.update('genres', id, content)
    return updated
  }

  async deleteGenre(id) {
    const deleted = await this._service.delete('genres', id)
    return deleted
  }
}

export default GenreController
