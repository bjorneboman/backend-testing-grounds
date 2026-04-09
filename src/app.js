const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const requestLogger = require("./middleware/requestLogger")

const usersRouter = require("./routes/users")
const productsRouter = require("./routes/products")
const app = express()

// --= Säkerhet =--
app.use(cors())

// --= Request parsing =--

app.use(express.json())
app.use(morgan("dev"))

// --= Loggning =--

app.use(morgan("dev"))
app.use(requestLogger)

// --= Routes =--

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/products", productsRouter)

// -------

app.use((req, res) => {
  res.status(404).json({
    message: "Sökvägen hittades inte", error: "not_found"
  })
})


module.exports = app