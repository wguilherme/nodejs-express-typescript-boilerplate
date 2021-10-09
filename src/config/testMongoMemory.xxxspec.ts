import request from 'supertest'
import Item from '../models/Item'
import mongoose from 'mongoose'
import app from '../app'
// const { setupDB } = require('./test-setupMemory')

// setupDB();

import connectToMongoMemory from "./database/mongoMemory"


// it('Should save item in mongo-memory-server', async done => {
//   const res = await request(app).post('/item')
//     .send({
//       title: 'Test item',

//     })

//   // console.log(res)
//   const item = await Item.findOne({ title: 'Test item' })

//   expect(item.title).toBeTruthy()
//   //  done()
// })

