import connectToMongo from './config/database/mongo';
import app from './app';

// dotenv.config();
const PORT = process.env.PORT || 80;

connectToMongo();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
