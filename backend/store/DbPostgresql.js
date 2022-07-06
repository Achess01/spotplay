import pg from 'pg'

export default class DataPostgresql {
  constructor() {
    this._pool = this.getConnection()
  }

  getConnection() {
    const pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'dbspotplay'
    })
    return pool
  }

  async save(table, data) {
    try {
      const query = `INSERT INTO ${table} (${Object.keys(data).join(
        ','
      )}) VALUES (${Object.keys(data)
        .map((current, index) => `$${index + 1}`)
        .join(',')})`
      const pooldb = this.getConnection()
      await pooldb.query(query, Object.values(data))
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getDataFromTable(table) {
    try {
      const query = `SELECT * FROM ${table}`
      const pooldb = this.getConnection()
      const resultPool = await pooldb.query(query)
      return resultPool.rows
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getEntityByAttribute(table, attribute, value) {
    console.log(table, attribute, value)
    try {
      const query = `SELECT * FROM ${table} WHERE ${attribute} = $1`
      const pooldb = this.getConnection()
      const resultPool = await pooldb.query(query, [value])
      console.log(resultPool.rows)
      return resultPool.rows[0]
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getEntity(table, id) {
    console.log(table, id)
    try {
      const query = `SELECT * FROM ${table} WHERE _id = $1`
      const pooldb = this.getConnection()
      const resultPool = await pooldb.query(query, [id])
      console.log(resultPool.rows)
      return resultPool.rows[0]
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getAllByAttribute(table, attribute, value) {
    console.log(table, attribute, value)
    try {
      const query = `SELECT * FROM ${table} WHERE ${attribute} = $1`
      const pooldb = this.getConnection()
      const resultPool = await pooldb.query(query, [value])
      console.log(resultPool.rows)
      return resultPool.rows
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async delete(table, id) {
    try {
      const idN = parseInt(id)
      const toDelete = await this.getEntity(table, idN)
      if (!toDelete) return null
      const query = `DELETE FROM ${table} WHERE _id = $1`
      const pooldb = this.getConnection()
      const resultPool = await pooldb.query(query, [idN])
      console.log(resultPool)
      return toDelete
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async update(table, id, content) {
    try {
      const idN = parseInt(id)
      let toUpdate = await this.getEntity(table, idN)
      if (!toUpdate) return null
      const query = `UPDATE ${table} SET ${Object.keys(content)
        .map((current, index) => `${current} = $${index + 1}`)
        .join(',')} WHERE _id = ${idN}`
      console.log(query)
      const pooldb = this.getConnection()
      const resultPool = await pooldb.query(query, Object.values(content))
      toUpdate = await this.getEntity(table, idN)
      console.log(resultPool)
      return toUpdate
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
