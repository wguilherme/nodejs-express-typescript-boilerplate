
//models
import Item from '../../models/Item'


const itemController = {
  async index(req, res) {
    try {

      const item = await Item.find();

      res.status(200).json(item)
    }
    catch (error) { res.status(400).json(error); }
  },
  async show(req, res) {
    const { id } = req.params

    try {
      const item = await Item.findById(id);
      res.status(200).send(item)
    }
    catch (error) { res.status(400).json(error); }
  },

  async create(req, res) {
    try {
      const item = new Item({
        title: req.body.title,
        description: req.body.description,
      });
      await item.save();
      res.status(201).json({ item });

    } catch (error) {
      res.status(400).json(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findByIdAndUpdate(
        id,
        { $set: req.body },
        { upsert: true, new: true }
      );
      const status = item ? 200 : 404;
      return res.status(status).json(item);
    }
    catch (error) { res.status(400).send(error); }
  },
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findByIdAndDelete(id)
      const statusCode = item ? 200 : 404
      const message = item ? { message: 'Item deleted' } : { message: 'Item not found' }

      return res.status(statusCode).json(message);
    }
    catch (error) { res.status(400).send(error); }
  },
  async deleteAll(req, res) {
    try {
      const item = await Item.deleteMany()
      const message = { message: 'Item deleted' }
      return res.status(200).json(message);
    }
    catch (error) { res.status(400).send(error); }
  }

}

export default itemController