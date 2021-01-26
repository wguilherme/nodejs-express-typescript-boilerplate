import('./db/db')
import app from './app'

// dotenv.config();
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});