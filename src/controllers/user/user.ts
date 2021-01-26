
import User from '../../models/User'

interface IUser {
   [key: string]: any // trick for remove all ts errors
}

async function index(req, res) {
   try {
      const user = await User.find();
      const statusCode = user ? 200 : 404;
      res.status(statusCode).json(user);

   }
   catch (error) { res.status(400).send(error); }
}
async function show(req, res) {
   const { id } = req.params

   try {
      const user = await User.findById(id);
      const statusCode = user ? 200 : 400;

      res.status(statusCode).json(user)
   }
   catch (error) { res.status(400).send(error); }
}

async function create(req, res) {

   const { id, name, email, password, role } = req.body;

   try {
      const user: IUser = new User({
         name, email, password, role
      });

      if (role === 'client') {

         const vendor = await User.findById(id);


         if (vendor) {
            vendor.clients.push(user)
            user.vendors.push(vendor._id)
            await vendor.save();
            await user.save();




         } else {
            res.status(400).json({ message: 'Please provide a vendor id' })
         }
      } else {
         await user.save();
      }
      res.status(201).send({ user });
   } catch (error) {
      res.status(400).send(error);
   }
}

async function update(req, res) {
   try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(
         id,
         { $set: req.body },
         { upsert: true, new: true }
      );
      const status = user ? 200 : 404;
      return res.status(status).json(user);
   }
   catch (error) { res.status(400).send(error); }
}

async function deleteUser(req, res) {
   try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id)
      const statusCode = user ? 200 : 404
      const message = user ? { message: 'User deleted' } : { message: 'User not found' }

      return res.status(statusCode).json(message);
   }
   catch (error) { res.status(400).send(error); }
}

async function deleteAll(req, res) {


   try {
      const user = await User.deleteMany()
      const message = { message: 'Item deleted' }
      return res.status(200).json(message);
   }
   catch (error) { res.status(400).send(error); }
}

export default {
   index, show, create, update, deleteUser, deleteAll
}