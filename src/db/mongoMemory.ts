import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
   const uri = await mongod.getUri();

   const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   };

   await mongoose.connect(uri, mongooseOpts);
}

module.exports.closeDatabase = async () => {
   await mongoose.connection.dropDatabase();
   await mongoose.connection.close();
   await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
   const collections = mongoose.connection.collections;

   for (const key in collections) {
      const collection = collections[key];
      // await collection.deleteMany();
   }
}

