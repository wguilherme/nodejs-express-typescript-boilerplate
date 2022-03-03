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
    console.log('users', users)
    const registerUser = await api.post('/user').send(users[0])
    expect(registerUser.status).toEqual(200)
    console.log('registerUser', registerUser.body)
  })
})
