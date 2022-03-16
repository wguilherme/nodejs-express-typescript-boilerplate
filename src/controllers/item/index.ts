import Item from '../../models/Item'

const itemController = {
  async index(req, res) {
    try {
      const items = await Item.find()

      res.status(200).json({
        status: 'success',
        data: items,
      })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },
  async show(req, res) {
    const { id } = req.params
    try {
      const item = await Item.findById(id)
      res.status(200).json({ status: 'success', data: item })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

  async create(req, res) {
    try {
      const item: any = new Item({
        title: req.body.title,
        description: req.body.description,
      })
      await item.save()
      res.status(200).json({ status: 'success', message: 'Item created' })
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
      const item = await Item.findByIdAndUpdate(
        id,
        { $set: req.body },
        { upsert: true, new: true },
      )

      res.status(200).json(item)
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },
  async deleteItem(req, res) {
    try {
      const { id } = req.params
      await Item.findByIdAndDelete(id)

      res.status(200).json({ status: 'success', message: 'Item deleted' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },
  async deleteAll(req, res) {
    try {
      await Item.deleteMany({})
      res.status(200).json({ status: 'success', message: 'All items deleted' })
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      })
    }
  },

}

export default itemController
