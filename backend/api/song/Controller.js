/* Los controllers se encargan de realizar
 *  la lógica del negocio
 */

class SongController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  async getOneSong(id) {
    const song = await this._service.getEntity('songs', id)
    return song
  }

  async getAllSongs({ artistId, genreId }) {
    let songs = await this._service.getDataFromTable('songs')
    if (!songs) return null
    if (artistId !== null) {
      songs = songs.filter((song) => song._idArtist === parseInt(artistId))
    }
    if (genreId !== null) {
      songs = songs.filter((song) => song._idGenre === parseInt(genreId))
    }
    return songs
  }

  async createNewSong(song) {
    const songEntity = new this._entity(song)
    const { _title, _uri, _duration, _image, _idArtist, _idGenre } = songEntity
    const response = await this._service.save('songs', {
      _title,
      _uri,
      _duration,
      _image,
      _idArtist,
      _idGenre
    })
    return response
  }

  async updateSong(id, content) {
    const updated = await this._service.update('songs', id, content)
    return updated
  }

  async deleteSong(id) {
    const deleted = await this._service.delete('songs', id)
    return deleted
  }
}

export default SongController
