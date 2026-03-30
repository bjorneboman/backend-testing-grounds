const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("Server alive 'n' kickin'!")
})

module.exports = app
