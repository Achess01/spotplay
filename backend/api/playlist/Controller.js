class PlaylistController {
  constructor(service, entity, auxiliarEntity) {
    this._service = service
    this._entity = entity
    this._auxiliarEntity = auxiliarEntity
  }

  async addSong(id, idSong) {
    const playlist = await this._service.getEntity('playlists', id)
    const song = await this._service.getEntity('songs', idSong)
    if (!song || !playlist) return null
    const playlistSong = new this._auxiliarEntity(playlist._id, song._id)
    return await this._service.save('playlistsongs', playlistSong)
  }

  async getPlaylists(idOwner) {
    let playlists = await this._service.getDataFromTable('playlists')
    if (idOwner !== null) {
      playlists = playlists.filter((p) => p._idOwner === idOwner)
    }
    return playlists
  }

  async createNewPlaylist(playlist) {
    const newPlaylist = new this._entity(playlist)
    const { _name, _idOwner, _description } = newPlaylist
    const response = await this._service.save('playlists', {
      _name,
      _idOwner,
      _description
    })
    return response
  }

  async getPlaylist(id) {
    const playlist = await this._service.getEntity('playlists', id)
    if (!playlist) return null
    const playlistSongs = await this._service.getDataFromTable('playlistsongs')
    const songIds = playlistSongs
      .filter((ps) => ps._idPlaylist === id)
      .map((ps) => ps._idSong)
    const allSongs = await this._service.getDataFromTable('songs')

    const selectedSongs = allSongs.filter((s) => {
      if (songIds.includes(s._id.toString())) return true
      return false
    })
    

    return { ...playlist._doc, songs: selectedSongs }
  }

  async updatePlaylist(id, content) {
    const updated = await this._service.update('playlists', id, content)
    return updated
  }

  async deletePlaylist(id) {
    const deleted = await this._service.delete('playlists', id)
    return deleted
  }
}

export default PlaylistController
