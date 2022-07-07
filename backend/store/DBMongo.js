import mongoose from 'mongoose'
import { config } from '../config/defaults.js'
import models from './MongoModels.js'

const mongodb = async () => {
  try {
    const db = await mongoose.connect(config.dbmongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB connected: ${db.connection.host}`)
  } catch (error) {
    console.error(error)
  }
}

export default class DBMongo {
  constructor() {
    this._models = models
    mongodb()
  }

  async save(table, data) {
    try {
      if (!this._models[table]) return null
      const model = models[table]
      const newData = model(data)
      const res = await newData.save()
      return res
    } catch {
      return null
    }
  }

  async getDataFromTable(table, extra) {
    try {
      if (!this._models[table]) return null
      const model = models[table]
      const searchQuery = extra || {}
      const res = await model.find(searchQuery)
      return res
    } catch {
      return null
    }
  }

  async delete(table, id) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const res = await model.findByIdAndDelete(id)
      return res
    } catch {
      return null
    }
  }

  async update(table, id, data) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const res = await model.findByIdAndUpdate(id, data)
      return res
    } catch {
      return null
    }
  }

  async getEntity(table, id) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const res = await model.findById(id)
      return res
    } catch {
      return null
    }
  }

  async getEntityByAttribute(table, attribute, value) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const queryObj = {}
      queryObj[attribute] = value
      const res = await model.findOne(queryObj)
      return res
    } catch {
      return null
    }
  }

  async getAllByAttribute(table, attribute, value, extra) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const queryObj = {}
      queryObj[attribute] = value
      const res = await model.find(queryObj)
      return res
    } catch {
      return null
    }
  }
}

/* const test = new DBMongo()
test
  .save({
    _username: 'test1',
    _email: 'email@test1.com',
    _password: 'password',
    _nuevo: 'jiji'
  })
  .then((res, err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(res)
    }
  }) */

/* test.all().then((res, err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(res[0]._id)
  }
}) */

/* test.delete('62c706f9d4306aabb58583fd').then((res, err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(res)
  }
}) */

/* test
  .update('62c70893d8d49d1528cd0398', { _email: 'mail@nuevo.com' })
  .then((res, err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(res)
    }
  }) */
