import Server from './Server.js'

export default function main(config) {
  const server = new Server(config)
  server.start()
}
