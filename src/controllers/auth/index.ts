/* eslint-disable consistent-return */
/* eslint-disable no-console */
import User from '../../models/User'

const authController = {

  async login(req, res) {
    console.log('entered')

    try {
      console.log(req.body)
      const { email, password } = req.body
      const user: any = await User.findByCredentials(email, password)

      console.log('pass2')

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      if (user == 'invalid-password') {
        console.log('pass3')
        return res.status(400).json({ message: 'Invalid password' })
      }
      console.log('pass4')
      if (user) await user.generateAuthToken()
      console.log(user)
      console.log('pass5')

      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error.message)
    }
  },

  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => token.token != req.token)
      await req.user.save()
      console.log('deslogado')
      res.status(200).json({ message: 'User disconnected' })
    } catch (error) {
      console.log('catch')
      res.status(500).json(error.message)
    }
  },

  async loggedUser(req, res) {
    console.log('get user')
    console.log(req.user)
    try {
      const user: any = await User.findById(req.user._id)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async logoutAll(req, res) {
    try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.status(200).json({ message: 'User disconnected on all devices' })
    } catch (error) {
      res.status(500).json(error.message)
    }
  },
}
export default authController
