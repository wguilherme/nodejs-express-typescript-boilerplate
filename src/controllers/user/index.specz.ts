import request from 'supertest'
import app from '../../app'
import User from '../../models/User'

// const { setupDB } = require('../config/test-setup')

// setupDB('jest-sellynx')

describe('Test index user', () => {
  it('Should create user', async (done) => {
    const res = await request(app).post('/user')
      .send({
        name: 'John',
        email: 'app@app.com',
        password: 123,
        role: 'admin',
      })
    // Searches the user in the database

    expect(res.status).toEqual(201)
    // expect(user).toBeTruthy()

    // console.log(res)

    const user = await User.findOne({ email: 'app@app.com' })

    expect(user.name).toBeTruthy()
    expect(user.email).toBeTruthy()
    expect(user.password).toBeTruthy()
    expect(user.role).toBeTruthy()

    done()
  })
})
