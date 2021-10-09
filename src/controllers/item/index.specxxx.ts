import request from 'supertest';
import Item from '../../models/Item';
import app from '../../app';

describe('Product tests suite', () => {
  it('Should save item in database', async (done) => {
    const input = {
      title: 'Item title 01',
      description: 'Item description',
    };

    const res = await request(app).post('/item').send(input);

    // const item = await Item.findOne({ title: input.title })

    expect(res.status).toEqual(200);

    // expect(item.title).toBe(input.title)
    // expect(item.description).toBe(input.description)

    // done();
  });
});
