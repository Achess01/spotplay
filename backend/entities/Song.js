class Song {
  constructor({ title, uri, duration, image, idArtist, idGenre }) {
    this._id = null
    this._title = title
    this._uri = uri
    this._duration = duration
    this._image = image
    this._idArtist = idArtist
    this._idGenre = idGenre
  }

  get id() {
    return this._id
  }

  set id(id) {
    this._id = id
  }

  returnNumber() {
    return 5
  }
}

export default Song
