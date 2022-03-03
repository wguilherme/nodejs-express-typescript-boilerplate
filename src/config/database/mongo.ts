import mongoose from 'mongoose'

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Database connected!')
  } catch (error) {
    console.error(error)
  }
}

export default connectToMongo
