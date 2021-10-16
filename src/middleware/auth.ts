import jwt from 'jsonwebtoken'
import User from '../models/User'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    const data: any = jwt.verify(token, process.env.JWT_SECRET)

    const user: any = await User.findOne({ _id: data._id, token })

    if (!user) throw new Error()
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({
      error: 'Not authorized to access this resource',
    })
  }
}
export default auth
