import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/defaults.js'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const helpers = {
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },

  comparePassword: (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
  },

  generateToken: (id, role) => {
    return jwt.sign({ id, role }, config.jwt.secret, {
      expiresIn: '1h'
    })
  },

  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret)
  },

  createTransport: () => {
    const OAuth2 = google.auth.OAuth2
    const myOAuth2Client = new OAuth2(
      config.email.clientId,
      config.email.clientSecret
    )
    myOAuth2Client.setCredentials({
      refresh_token: config.email.refreshToken
    })
    const myAccessToken = myOAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: config.email.email, // your gmail account you used to set the project up in google cloud console"
        clientId: config.email.clientId,
        clientSecret: config.email.clientSecret,
        refreshToken: config.email.refreshToken,
        accessToken: myAccessToken // access token variable we defined earlier
      }
    })
    return transport
  },
  emailData: config.email
}

export default helpers
