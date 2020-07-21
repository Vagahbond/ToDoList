import * as db from '../src/db'
import mongoose from '../src/db'

beforeEach(async () => await db.connect())

afterEach(async () => {
  const collections = Object.values(mongoose.connection.collections)
  await Promise.all(collections.map(c => c.deleteMany()))
})

afterEach(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await db.memory_server.stop()
})
