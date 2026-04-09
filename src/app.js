const express = require("express")
const cors = require("cors")

const usersRouter = require("./routes/users")
const productsRouter = require("./routes/products")
const app = express()
const morgan = require("morgan")

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Routes

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/products", productsRouter)

// -------

app.use((req, res) => {
  res.status(404).json({
    message: "Sökvägen hittades inte", error: "not_found"
  })
})


module.exports = app