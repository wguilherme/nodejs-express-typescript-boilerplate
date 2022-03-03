import request from 'supertest'
import User from '../models/User'
import app from '../app'

const body: any = {
  name: 'John',
  email: 'apptest@app.com',
  password: 12345678,
  role: 'user',
}

describe('auth test suite ', () => {
  it('Should create user', async (done) => {
    const res = await request(app).post('/user').send(body)

    expect(res.status).toEqual(201)

    // Searches the user in the database
    const user = await User.findOne({ email: body.email })

    expect(user.name).toBeTruthy()
    expect(user.email).toBeTruthy()
    expect(user.password).toBeTruthy()
    expect(user.role).toBeTruthy()

    done()
  })

  // it('Should be return a user', async done => {
  //    const res: any = await request(app).post('/login')
  //       .send({
  //          email: body.email,
  //          password: body.password,
  //       })

  //    expect(res.status).toEqual(200)

  //    // expect(user.name).toBeTruthy()
  //    // expect(user.email).toBeTruthy()
  //    // expect(user.password).toBeTruthy()
  //    // expect(user.role).toBeTruthy()

  //    done()
  // })
})
