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

  getPlaylists(idOwner) {
    let playlists = this._service.getDataFromTable('playlist')
    if (idOwner !== null) {
      playlists = playlists.filter((p) => p._idOwner === parseInt(idOwner))
    }
    return playlists
  }

  createNewPlaylist(playlist) {
    const newPlaylist = new this._entity(playlist)
    const response = this._service.save('playlist', newPlaylist)
    return response
  }

  getPlaylist(id) {
    const playlist = this._service.getEntity('playlist', id)
    if (!playlist) return null
    const playlistSongs = this._service.getDataFromTable('playlistSong')
    const songIds = playlistSongs
      .filter((ps) => ps._idPlaylist === parseInt(id))
      .map((ps) => ps._idSong)
    const allSongs = this._service.getDataFromTable('song')
    const selectedSongs = allSongs.filter((s) => songIds.includes(s._id))
    playlist.songs = selectedSongs
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
