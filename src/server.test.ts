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

  it('Should save item in database', async () => {
    const item = {
      title: 'Item title 01',
      description: 'Item description',
    }

    const createdItem: any = await request(app).post('/item').send(item)
    expect(createdItem.status).toEqual(201)

    const foundItem: any = await Item.findOne({ title: item.title })
    expect(foundItem?.title).toEqual(item.title)
  })
})
