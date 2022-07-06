class ArtistController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  async getArtists() {
    const artists = await this._service.getDataFromTable('artists')
    return artists
  }

  async createNewArtist(artist) {
    const newArtist = new this._entity(artist)
    const response = await this._service.save('artists', newArtist)
    return response
  }

  async getArtist(id) {
    const artist = await this._service.getEntity('artists', id)
    return artist
  }

  async updateArtist(id, content) {
    const updated = await this._service.update('artists', id, content)
    return updated
  }

  async deleteArtist(id) {
    const deleted = await this._service.delete('artists', id)
    return deleted
  }
}

export default ArtistController
