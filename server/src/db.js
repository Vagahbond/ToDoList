import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import 'mocha'

export const memory_server = new MongoMemoryServer()
export async function connect() {
  let uri = process.env.MONGO_URL || 'mongodb://localhost:27017/todolist-ut'

  if (process.env.TEST_RUN !== undefined) {
    uri = await memory_server.getConnectionString(true)
  }

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

connect()

if (process.env.TEST_RUN !== undefined) {
  beforeEach(async () => await connect())

  afterEach(async () => {
    const collections = Object.values(mongoose.connection.collections)
    await Promise.all(collections.map(c => c.deleteMany()))
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await memory_server.stop()
  })
} else {
  memory_server.stop()
}

export default mongoose
