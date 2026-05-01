const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Couldn't connect to MongoDb: ${error.message}`);
    process.exit();
  }
}

module.exports = { connectToDatabase };
