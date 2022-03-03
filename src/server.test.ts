import request from 'supertest'
import Item from './models/Item'
import setupMongoMemory from './config/testSetup/setupMongoMemoryTest'
import app from './app'

setupMongoMemory()

describe('Test my app server', () => {
  it('should return status code 200', async () => {
    const res: any = await request(app).get('/ping')
    expect(res.status).toEqual(200)
    expect(res.body.message).toEqual('pong')
  })
})
