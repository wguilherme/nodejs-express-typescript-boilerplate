import mongoose from 'mongoose'

const generalController = {
  async index(req, res) {
    try {
      res.status(200).json({ message: 'API Online' })
    } catch (error) {
      res.status(400).json({ error, message: error.message })
    }
  },
  async ping(req, res) {
    try {
      res.status(200).json({ message: 'pong' })
    } catch (error) {
      res.status(400).json({ error, message: error.message })
    }
  },

  async resetMongoDb(req, res) {
    try {
      await mongoose.connection.dropDatabase()
      res.status(200).json({ status: 'success', message: 'Database reseted' })
    } catch (error) {
      res.status(400).json({ error, message: error.message })
    }
  },

}

export default generalController
