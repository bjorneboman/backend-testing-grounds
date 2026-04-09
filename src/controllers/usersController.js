let users = [
  {id: 1, name: "Alice", email: "alice@mail.com"},
  {id: 2, name: "Bob", email: "bob@mail.com"},
  {id: 3, name: "Charlie", email: "charlie@mail.com"}
]

const getAllUsers = (req, res) => {
  res.json(users)
}

const getUserById = (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user)
		return res.status(404).json({ message: "Användaren hittades inte", error: "user_not_found" });

	res.json(user);
}

const createUser = (req, res) => {
    const newUser = {id: users.length + 1, ...req.body}
    users.push(newUser)
    res.status(201).json(newUser)
}

const deleteUser = (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index < 0) {
        return res.status(404).json({
            message: "Användaren hittades inte", error: "user_not_found"
        })
    }
    users.splice(index, 1)
    res.status(204).send()
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
}