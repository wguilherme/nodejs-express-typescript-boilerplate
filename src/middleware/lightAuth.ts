import jwt from 'jsonwebtoken'
import User from '../models/User'
// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    if (!token) {
      next()
      return false
    }

    const data = jwt.verify(token, process.env.JWT_KEY)

    const user = await User.findOne({
      _id: data._id,
      'tokens.token': token,
    })

    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    next()
  }
}
export default auth
