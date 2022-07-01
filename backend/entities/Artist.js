class Artist {
  constructor({ firstName, lastName, avatarUri }) {
    this._firstName = firstName
    this._lastName = lastName
    this._avatarUri = avatarUri
  }
}

/* export class ArtistSong {
  constructor({ idArtist, idSong }) {
    this._id = null
    this._idArtist = idArtist
    this._idSong = idSong
  }
}
 */
export default Artist
