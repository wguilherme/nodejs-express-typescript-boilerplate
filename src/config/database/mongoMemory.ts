import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = MongoMemoryServer.create();

const mongoMemorySetup = {

  async connect() {
    const uri = await (await mongod).getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      connectTimeoutMS: 50000,
    };

    await mongoose.connect(uri, mongooseOpts);
  },

  async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await mongod).stop();
  },

  // async clearDatabase() {
  //   const { collections } = mongoose.connection;

  //   for (const key in collections) {
  //     const collection: any = collections[key];

  //     collection.deleteMany();
  //   }
  // },

};

export default mongoMemorySetup;
