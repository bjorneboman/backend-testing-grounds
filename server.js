require("dotenv").config()

const app = require("./src/app")
const { connectToDB } = require("./src/config/database")

const PORT = process.env.PORT || 3001

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(`MONGODB_URI missing in .env!`);
  process.exit(1);
}

async function startServer() {
  await connectToDB()
  app.listen(PORT, () => {
    console.log(`Servern lyssnar på http://localhost:${PORT}`)
  })
}

startServer()
