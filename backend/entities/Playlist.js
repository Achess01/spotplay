class Playlist {
  constructor({ name, idOwner, description }) {
    this._id = null
    this._name = name
    this._idOwner = idOwner
    this._description = description
  }

  addSong() {}
}

export class PlaylistSong {
  constructor(idPlaylist, idSong) {
    this._id = null
    this._idPlaylist = idPlaylist
    this._idSong = idSong
  }
}

export default Playlist
