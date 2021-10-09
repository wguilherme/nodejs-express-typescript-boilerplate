import mongoose from 'mongoose';

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('Database connected!');
  } catch (error) {
    console.error(error);
  }
};

export default connectToMongo;
