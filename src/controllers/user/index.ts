import User from '../../models/User'

const userController = {
  async index(req, res) {
    try {
      const user = await User.find()
      res.status(200).json({
        status: 'success',
        data: user,
      })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      res.status(200).json({ status: 'success', data: user })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },
  async loggedUser(req, res) {
    try {
      const user: any = await User.findById(req.user._id)
      res.status(200).json({ status: 'success', data: user })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async create(req, res) {
    try {
      const user: any = await User.create(req.body)
      await user.generateAuthToken()

      await user.save()

      res.status(200).json({ status: 'success', message: 'User created', data: { token: user.token } })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { upsert: false, new: true },
      )

      res.status(200).json({ status: 'success', message: 'User updated' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      await User.findByIdAndDelete(id)

      res.status(200).json({ status: 'success', message: 'User deleted' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async deleteAll(req, res) {
    try {
      await User.deleteMany({})
      res.status(200).json({ status: 'success', message: 'All users deleted' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

}

export default userController
