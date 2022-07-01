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
    return 'all songs'
  }

  createNewSong(song) {
    const songEntity = new this._entity(song)
    const response = this._service.save('song', songEntity)
    return response
  }

  updateSong(song) {
    console.log(song)
    return 'song updated'
  }

  deleteSong(id) {
    console.log(id)
    return 'song deleted'
  }
}

export default SongController
