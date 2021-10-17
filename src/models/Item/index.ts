import mongoose from 'mongoose'

const indexSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const Item = mongoose.model('Item', indexSchema)
export default Item
