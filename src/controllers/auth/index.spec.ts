import request from 'supertest'
import User from '../../models/User'
import app from '../../app'
const { setupDB } = require('./../config/test-setupMemory')
setupDB();

describe('auth test suite ', () => {

   it('Should create user', async done => {
      const res = await request(app).post('/user')
         .send({
            name: 'John',
            email: 'app@app.com',
            password: 123,
            role: 'admin'
         })
      // Searches the user in the database

      expect(res.status).toEqual(201)
      // expect(user).toBeTruthy()

      // console.log(res)

      const user = await User.findOne({ email: 'app@app.com' });

      expect(user.name).toBeTruthy()
      expect(user.email).toBeTruthy()
      expect(user.password).toBeTruthy()
      expect(user.role).toBeTruthy()

      done()
   })


   it('Should be return a user', async done => {
      const res = await request(app).post('/login')
         .send({
            email: 'app@app.com',
            password: 123,
         })

      // console.log(res)
      const user = await User.findOne({ email: 'app@app.com', password: 123 })

      expect(user.name).toBeTruthy()
      expect(user.email).toBeTruthy()
      expect(user.password).toBeTruthy()
      expect(user.role).toBeTruthy()

      done()
   })
});

/**
 * Complete product example.
 */
const productComplete = {
   name: 'iPhone 11',
   price: 699,
   description: 'A new dual‑camera system captures more of what you see and love. '
};