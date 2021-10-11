import User from '../../models/User'

const userController = {

  async index(req, res) {
    try {
      const user = await User.find()
      const statusCode = user ? 200 : 404
      res.status(statusCode).json(user)
    } catch (error) { res.status(400).json(error.message) }
  },
  async show(req, res) {
    const { id } = req.params

    try {
      const user = await User.findById(id)
      const statusCode = user ? 200 : 400

      res.status(statusCode).json(user)
    } catch (error) { res.status(400).json(error.message) }
  },

  async create(req, res) {
    const {
      name, email, password, role,
    } = req.body

    try {
      const user: any = new User({
        name, email, password, role,
      })

      await user.generateAuthToken()
      await user.save()

      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(error.message)
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const user = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { upsert: false, new: true },
      )
      const status = user ? 200 : 404
      return res.status(status).json(user)
    } catch (error) { res.status(400).json(error.message) }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const user = await User.findByIdAndDelete(id)
      const statusCode = user ? 200 : 404
      const message = user ? { message: 'User deleted' } : { message: 'User not found' }

      return res.status(statusCode).json(message)
    } catch (error) { res.status(400).json(error.message) }
  },

  async deleteAll(req, res) {
    try {
      const user = await User.deleteMany()
      const message = { message: 'Item deleted' }
      return res.status(200).json(message)
    } catch (error) { res.status(400).json(error.message) }
  },

}

export default userController
