import bcrypt from 'bcrypt'

const helpers = {
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },

  comparePassword: (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
  }
}

export default helpers
