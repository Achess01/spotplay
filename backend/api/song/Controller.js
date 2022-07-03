/* Los controllers se encargan de realizar
 *  la lógica del negocio
 */

class SongController {
  constructor(service, entity) {
    this._service = service
    this._entity = entity
  }

  getOneSong(id) {
    const song = this._service.getEntity('song', id)
    return song
  }

  getAllSongs() {
    const songs = this.service.getDataFromTable('song')
    return songs
  }

  createNewSong(song) {
    const songEntity = new this._entity(song)
    const response = this._service.save('song', songEntity)
    return response
  }

  updateSong(id, content) {
    const updated = this._service.update('song', id, content)
    return updated
  }

  deleteSong(id) {
    const deleted = this._service.delete('song', id)
    return deleted
  }
}

export default SongController
