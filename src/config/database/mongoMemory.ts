import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongooseOptions: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 50000,
}

const mongoMemoryHandler = {
  async connect() {
    try {
      const mongod = await MongoMemoryServer.create()
      const uri = mongod.getUri()
      await mongoose.connect(uri, mongooseOptions)
    } catch (error: any) {
      console.log('error', error.message)
    }
  },
  async disconnect() {
    try { await mongoose.disconnect() } catch (error: any) { console.log('error on disconnect', error.message) }
  },
}
export default mongoMemoryHandler
