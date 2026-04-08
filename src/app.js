const express = require("express")

const app = express()


app.use(express.json())

let users = [
  {id: 1, name: "Alice", email: "alice@mail.com"},
  {id: 2, name: "Bob", email: "bob@mail.com"},
  {id: 3, name: "Charlie", "email": "charlie@mail.com"}
]

app.get("/users", (req, res) => {
  res.json(users)
})

app.get/"users/:id", (req, res) => {
  // const id = parseInt(req.params.id)
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({
      message: "User not found", error: "user_not_found"
    })
  }
  res.json(user)
}

app.post("/users", (req, res) => {
  const newUser = {id: users.length + 1, ...req.body}
  users.push(newUser)
  res.status(201).json(newUser)
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
// module.exports = app
