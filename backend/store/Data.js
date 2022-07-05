import fs from 'fs'

class DataJson {
  constructor() {
    this._dataPath = './store/db.json'
    this.setTables()
  }

  setTables() {
    const items = this.readJsonFile()
    const tables = {
      user: [],
      role: [],
      song: [],
      artist: [],
      playlist: [],
      playlistSong: [],
      genre: []
    }
    if (items.length === 0) {
      this.writeJsonFile(tables)
    }
  }

  readJsonFile() {
    const contentFile = fs.readFileSync(this._dataPath, 'utf-8')
    if (contentFile) {
      return JSON.parse(contentFile)
    }
    return []
  }

  writeJsonFile(data) {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(this._dataPath, jsonData)
  }

  generatePk(table) {
    const data = this.getDataFromTable(table)
    if (data) {
      const lastItem = data.pop()
      if (lastItem) {
        return lastItem._id + 1
      }
    }
    return 1
  }

  getDataFromTable(table) {
    const items = this.readJsonFile()
    const data = items[table]
    if (data) {
      return data
    }
    return null
  }

  getEntity(tableName, id) {
    const idN = parseInt(id)
    const table = this.getDataFromTable(tableName)
    if (table) {
      const entity = table.find((e) => e._id === idN)
      if (entity) {
        return entity
      }
    }
    return null
  }

  getEntityByAttribute(tableName, attribute, value) {
    const table = this.getDataFromTable(tableName)
    if (table) {
      const entity = table.find((e) => e[attribute] === value)
      if (entity) {
        return entity
      }
    }
    return null
  }

  update(table, id, content) {
    const idN = parseInt(id)
    const items = this.readJsonFile()
    const data = items[table]
    if (items[table]) {
      const index = data.findIndex((o) => o._id === idN)
      if (index !== -1) {
        const obj = data[index]
        data[index] = {
          ...obj,
          ...content
        }
        this.writeJsonFile(items)
        return data[index]
      }
    }
    return null
  }

  save(table, data) {
    const items = this.readJsonFile()
    const id = this.generatePk(table)
    data._id = id
    items[table].push(data)
    this.writeJsonFile(items)
    return data
  }

  delete(table, id) {
    const idN = parseInt(id)
    const items = this.readJsonFile()
    const data = items[table]
    if (items[table]) {
      const index = data.findIndex((o) => o._id === idN)
      if (index !== -1) {
        const deletedObj = data.splice(index, 1)
        this.writeJsonFile(items)
        return deletedObj[0]
      }
    }
    return null
  }
}

/* const data = new DataJson()
data.save('song', { name: 'Efecto', artist: 'Bad Bunny' })
data.save('user', { name: 'Bad', lastName: 'Bunny' })
console.table(data.getDataFromTable('song'))
console.table(data.getDataFromTable('user')) */

export default DataJson
