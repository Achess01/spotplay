import dotenv from 'dotenv'

dotenv.config()

export const config = {
  api: {
    port: process.env.PORT || 8000,
    hostname: process.env.HOSTNAME || 'localhost',
    name: process.env.NAMEAPP || 'app'
  },
  db: {
    host: process.env.DB_HOST || 'localhost'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  email: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    email: process.env.EMAIL
  },
  dbmongo: {
    uri: process.env.MONGO_URI
  }
}
