const { setupDB } = require('../config/test-setup')
import request from 'supertest'
import app from '../../app'
import Product from './../../models/Product'
setupDB('jest-sellynx')


describe('Test Item CRUD operations', () => {
   it('should be status 200', async () => {
      const res = await request(app).get('/item')
      expect(res.status).toEqual(200)
   })

   // it('should be create item and return 201', async () => {
   //    const res = await request(app).post('/item', (req, res) => {
   //       req.send({
   //          title: "Item test",
   //          description: "Item description",
   //       })
   //    })
   //    expect(res.status).toEqual(201)
   // })
})
