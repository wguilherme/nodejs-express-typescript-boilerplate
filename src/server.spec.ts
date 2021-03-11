
import request from 'supertest'
import app from './app'


describe('Test my app server', () => {
   it('should get main route', async () => {
      const res = await request(app).get('/ping')
      // console.log(res)
      expect(res.body.message).toEqual('pong')
      expect(res.status).toEqual(200)
   })
})
