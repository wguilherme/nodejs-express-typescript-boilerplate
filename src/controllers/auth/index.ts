import User from '../../models/User'

const authController = {

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user: any = await User.findByCredentials(email, password)

      if (!user) { throw new Error('User not found') }
      if (user === 'invalid-password') { throw new Error('Invalid password') }

      if (user) await user.generateAuthToken()

      res.status(200).json({ status: 'success', data: { token: user.token, user } })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => token.token != req.token)
      await req.user.save()

      res.status(200).json({ status: 'success', message: 'User disconnected' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async logoutAll(req, res) {
    try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.status(200).json({ status: 'success', message: 'User disconnected on all devices' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },
}
export default authController
