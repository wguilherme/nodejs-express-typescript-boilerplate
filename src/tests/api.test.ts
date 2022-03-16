/* eslint-disable max-len */
import request from 'supertest'
import app from '../app'
import setupMongoMemory from '../config/testSetup/setupMongoMemoryTest'
import baseUrl from './config'
import { users } from './fixtures/data.json'

const api = request(app)
setupMongoMemory()

describe('user register and authentication', () => {
  it('should register a new user', async () => {
    const registerUser = await api.post(`${baseUrl}/user`).send({
      name: users[0].name,
      email: users[0].email,
      role: users[0].role,
      passwordConfirm: users[0].password,
      password: users[0].password,
    })

    expect(registerUser.status).toEqual(200)
    expect(registerUser.body.data.token).toBeTruthy()

    users[0].token = registerUser.body.data.token
  })
  it('should list all users', async () => {
    const listUsers = await api.get(`${baseUrl}/user`)
    expect(listUsers.status).toEqual(200)
  })
  it('should get logged user with token', async () => {
    const getLoggedUser = await api.get(`${baseUrl}/user/me/auth`).set('Authorization', `Bearer ${users[0].token}`)
    expect(getLoggedUser.status).toEqual(200)
    expect(getLoggedUser.body.data.name).toEqual(users[0].name)
    expect(getLoggedUser.body.data.token).toEqual(users[0].token)
    expect(getLoggedUser.body.data.passwordConfirm).toEqual(undefined)
    expect(getLoggedUser.body.data.password !== users[0].password).toBe(true)
  })
})
