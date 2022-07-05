class PlaylistController {
  constructor(service, entity, auxiliarEntity) {
    this._service = service
    this._entity = entity
    this._auxiliarEntity = auxiliarEntity
  }

  addSong(id, idSong) {
    const playlist = this._service.getEntity('playlist', id)
    const song = this._service.getEntity('song', idSong)
    if (!song || !playlist) return null
    const playlistSong = new this._auxiliarEntity(playlist._id, song._id)
    return this._service.save('playlistSong', playlistSong)
  }

  getPlaylists() {
    const playlists = this._service.getDataFromTable('playlist')
    return playlists
  }

  createNewPlaylist(playlist) {
    const newPlaylist = new this._entity(playlist)
    const response = this._service.save('playlist', newPlaylist)
    return response
  }

  getPlaylist(id) {
    const playlist = this._service.getEntity('playlist', id)
    return playlist
  }

  updatePlaylist(id, content) {
    const updated = this._service.update('playlist', id, content)
    return updated
  }

  deletePlaylist(id) {
    const deleted = this._service.delete('playlist', id)
    return deleted
  }
}

export default PlaylistController
