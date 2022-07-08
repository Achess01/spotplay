import mongoose from 'mongoose'

const models = {
  users: mongoose.model(
    'users',
    new mongoose.Schema({
      _username: {
        type: String,
        required: true
      },
      _email: {
        type: String,
        required: true
      },
      _password: {
        type: String,
        required: true
      },
      _roleid: {
        type: String
      }
    })
  ),
  roles: mongoose.model(
    'roles',
    new mongoose.Schema({
      _name: {
        type: String,
        required: true
      },
      _description: {
        type: String,
        required: true
      }
    })
  ),
  songs: mongoose.model(
    'songs',
    new mongoose.Schema({
      _title: {
        type: String,
        required: true
      },
      _uri: {
        type: String,
        required: true
      },
      _duration: {
        type: String,
        required: true
      },
      _image: {
        type: String,
        required: true
      },
      _idArtist: {
        type: String,
        required: true
      },
      _idGenre: {
        type: String,
        required: true
      }
    })
  ),
  genres: mongoose.model(
    'genres',
    new mongoose.Schema({
      _name: {
        type: String,
        required: true
      },
      _description: {
        type: String,
        required: true
      }
    })
  ),
  playlists: mongoose.model(
    'playlists',
    new mongoose.Schema({
      _name: {
        type: String,
        required: true
      },
      _idOwner: {
        type: String,
        required: true
      },
      _description: {
        type: String,
        required: true
      }
    })
  ),
  playlistsongs: mongoose.model(
    'playlistsongs',
    new mongoose.Schema({
      _idPlaylist: {
        type: String,
        required: true
      },
      _idSong: {
        type: String,
        required: true
      }
    })
  ),
  artists: mongoose.model(
    'artists',
    new mongoose.Schema({
      _firstName: {
        type: String,
        required: true
      },
      _lastName: {
        type: String,
        required: true
      },
      _avatarUri: {
        type: String,
        required: true
      }
    })
  )
}

export default models
