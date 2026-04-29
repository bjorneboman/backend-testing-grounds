require('dotenv').config();

const app = require('./src/app');
const { connectToDatabase } = require('./src/config/database');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(`MONGODB_URI missing in .env!`);
  process.exit(1);
}

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is listenting to port ${PORT}`);
  });
}

startServer();
