
import User from './../../models/User'

async function login(req, res) {

   const { email, password } = req.body

   try {

      const user = await User.findOne({ email, password });

      const statusCode = user ? 200 : 404;

      const response = user ? user : { message: 'User not found' }

      res.status(statusCode).json(response);

   }
   catch (error) { res.status(400).json(error) }
}
export default { login }