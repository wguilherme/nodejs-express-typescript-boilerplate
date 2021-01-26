// test-setup.js 
const mongoose = require('mongoose')
const dbHandler = require('./../../db/mongoMemory')

mongoose.set('useCreateIndex', true)
mongoose.promise = global.Promise

async function removeAllCollections() {
   const collections = Object.keys(mongoose.connection.collections)
   for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName]
      await collection.deleteMany()
   }
}

async function dropAllCollections() {
   const collections = Object.keys(mongoose.connection.collections)
   for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName]
      try {
         await collection.drop()
      } catch (error) {
         // Sometimes this error happens, but you can safely ignore it
         if (error.message === 'ns not found') return
         // This error occurs when you use it.todo. You can
         // safely ignore this error too
         if (error.message.includes('a background operation is currently running')) return
         console.log(error.message)
      }
   }
}

module.exports = {

   setupDB() {

      /**
 * Connect to a new in-memory database before running any tests.
 */
      beforeAll(async () => await dbHandler.connect());

      /**
       * Clear all test data after every test.
       */
      afterEach(async () => await dbHandler.clearDatabase());

      /**
       * Remove and close the db and server.
       */
      afterAll(async () => await dbHandler.closeDatabase());

   }
}