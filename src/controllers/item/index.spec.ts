import Item from '../../models/Item'
import request from 'supertest'
import app from '../../app'
const { setupDB } = require('./../config/test-setupMemory')
setupDB();


describe('Product tests suite', () => {

it('Should save item in database', async done => {

   const createdItem = { 
      title: 'Item title 01',
      description: 'Item description'
   }

   const res = await request(app).post('/item')
      .send(createdItem)

      const item = await Item.findOne({ title: createdItem.title })

      expect(item.title).toBe(createdItem.title)
      expect(item.description).toBe(createdItem.description)

      done();
   })
 
})