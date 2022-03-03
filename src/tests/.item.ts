import request from 'supertest'
import Item from '../models/Item'
import app from '../app'

describe('Test my app server', () => {
  const itemData = {
    title: 'Item title 01',
    description: 'Item description',
    id: null,
  }

  it('Should save item in database', async () => {
    const createdItem: any = await request(app).post('/item').send(itemData)
    itemData.id = createdItem.body._id
    const item: any = await Item.findById(itemData.id)
    expect(createdItem.status).toEqual(201)
    expect(item.title).toEqual(item.title)
  })

  it('Should get item by id', async () => {
    const item: any = await request(app).get(`/item/${itemData.id}`)
    expect(item.status).toEqual(200)
    expect(item.title).toEqual(item.title)
  })
  it('Should update item and return updated item', async () => {
    const newItemTitle = 'New item title'
    const item: any = await request(app).patch(`/item/${itemData.id}`).send({ title: newItemTitle })
    expect(item.status).toEqual(200)
    expect(item.body.title).toEqual(newItemTitle)
  })
  it('Should delete item by ID', async () => {
    const newItemTitle = 'New item title'
    const item: any = await request(app).delete(`/item/${itemData.id}`)
    const itemExists: any = await Item.findById(itemData.id)
    expect(item.status).toEqual(200)
    expect(itemExists).toBe(null)
  })
})
