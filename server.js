require("dotenv").config()

const app = require("./src/app")
const { connectToDB } = require("./src/config/database")

const PORT = process.env.PORT || 3000

async function startServer() {
  await connectToDB()
  app.listen(PORT, () => {
    console.log(`Servern lyssnar på http://localhost:${PORT}`)
  })
}

startServer()
