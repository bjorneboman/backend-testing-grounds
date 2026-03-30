const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("MONGODB_URI saknas i miljövariablerna!")
  process.exit(1)
}

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Ansluten till MongoDB")

    const Game = mongoose.model(
      "Game",
      new mongoose.Schema({}, { strict: false }),
      "Game",
    )

    const allGames = await Game.find()
    console.log("Documents found:", allGames.length)
    allGames.forEach((doc) => console.log(doc))

    await mongoose.connection.close()
  } catch (error) {
    console.error("Kunde inte ansluta till MongoDB:", error.message)
    process.exit(1)
  }
}

module.exports = { connectToDB }
