/* eslint-disable max-len */
import request from 'supertest'
import setupMongoMemory from '../config/testSetup/setupMongoMemoryTest'
import app from '../app'

import { users } from './fixtures/data.json'

setupMongoMemory()

const api = request(app)

// user and authentication

describe('user register and authentication', () => {
  it('should register a new user', async () => {
    const registerUser = await api.post('/user').send({
      name: 'fulano',
      email: 'app@app.com',
      passwordConfirm: '12345678',
      password: '12345678',
    })
    console.log(registerUser.text)
    expect(registerUser.status).toEqual(200)
  })
  it('should list all users', async () => {
    const listUsers = await api.get('/user')
    expect(listUsers.status).toEqual(200)
    // users[0].id = listUsers.body[0]._id
  })
  // it('should show user with correct data', async () => {

  // })
})
