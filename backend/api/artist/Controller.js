class ArtistController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  getArtists() {
    const artists = this._service.getDataFromTable('artist')
    return artists
  }

  createNewArtist(artist) {
    const newArtist = new this._entity(artist)
    const response = this._service.save('artist', newArtist)
    return response
  }

  getArtist(id) {
    const artist = this._service.getEntity('artist', id)
    return artist
  }

  updateArtist(id, content) {
    const updated = this._service.update('artist', id, content)
    return updated
  }

  deleteArtist(id) {
    const deleted = this._service.delete('artist', id)
    return deleted
  }
}

export default ArtistController
