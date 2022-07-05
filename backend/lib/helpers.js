import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/defaults.js'

const helpers = {
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },

  comparePassword: (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
  },

  generateToken: (id) => {
    return jwt.sign({ id }, config.jwt.secret, { expiresIn: '1h' })
  },

  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret)
  }
}

export default helpers
