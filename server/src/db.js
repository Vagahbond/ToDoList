import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

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

if (!process.env.TEST_RUN) {
  memory_server.stop()
}

export default mongoose
