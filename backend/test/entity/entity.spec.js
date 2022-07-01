import { expect } from 'chai'
import { describe, it } from 'mocha'
import Song from '../../entities/Song.js'
import Genre from '../../entities/Genre.js'
import Artist from '../../entities/Artist.js'
import Role from '../../entities/Role.js'
import Playlist from '../../entities/Playlist.js'
import User from '../../entities/User.js'

// Escribiendo un test
describe('Testing Song class', () => {
  // Setup class
  const literalSong = {
    title: 'title',
    uri: 'uri',
    duration: 'duration',
    image: 'image',
    idArtist: 'idArtist',
    idGenre: 'idGenre'
  }

  const song = new Song(literalSong)

  it("It should'nt be null", () => {
    expect(song).to.not.equal(null)
  })

  it('Title should be title', () => {
    expect(song._title).to.equal('title')
  })

  it('Should be a number', () => {
    expect(song.returnNumber()).to.equal(5)
  })
})

describe('Testing Genre class', () => {
  // Setup class
  const literalGenre = {
    name: 'name',
    description: 'description'
  }

  const genre = new Genre(literalGenre)

  it("It should'nt be null", () => {
    expect(genre).to.not.equal(null)
  })

  it('name should be name', () => {
    expect(genre._name).to.equal('name')
  })
})

describe('Testing Artist class', () => {
  // Setup class
  const literalArtist = {
    firstName: 'Bad',
    lastName: 'Bunny',
    avatarUri: 'www.avatar.uri'
  }

  const artist = new Artist(literalArtist)

  it("It should'nt be null", () => {
    expect(artist).to.not.equal(null)
  })
})

describe('Testing Role class', () => {
  // Setup class
  const config = {
    name: 'Lector',
    description: 'Puede craer playlists'
  }

  const role = new Role(config)

  it("It should'nt be null", () => {
    expect(role).to.not.equal(null)
  })
})

describe('Testing Playlist class', () => {
  // Setup class
  const config = {
    name: 'Playlist',
    idOwner: 'idOwner',
    description: 'Puede craer playlists'
  }

  const playlist = new Playlist(config)

  it("It should'nt be null", () => {
    expect(playlist).to.not.equal(null)
  })
})

describe('Testing User class', () => {
  // Setup class
  const config = {
    username: 'user',
    email: 'user@email.com',
    pasword: 'password'
  }

  const user = new User(config)

  it("It should'nt be null", () => {
    expect(user).to.not.equal(null)
  })
})
