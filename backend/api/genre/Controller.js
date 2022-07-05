class GenreController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  getGenres() {
    const genres = this._service.getDataFromTable('genre')
    return genres
  }

  createNewGenre(genre) {
    const newGenre = new this._entity(genre)
    const response = this._service.save('genre', newGenre)
    return response
  }

  getGenre(id) {
    const genre = this._service.getEntity('genre', id)
    return genre
  }

  updateGenre(id, content) {
    const updated = this._service.update('genre', id, content)
    return updated
  }

  deleteGenre(id) {
    const deleted = this._service.delete('genre', id)
    return deleted
  }
}

export default GenreController
