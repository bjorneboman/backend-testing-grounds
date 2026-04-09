let users = [
  {id: 1, name: "Alice", email: "alice@mail.com", role: "admin"},
  {id: 2, name: "Bob", email: "bob@mail.com", role: "editor"},
  {id: 3, name: "Charlie", email: "charlie@mail.com", role: "viewer"},
  {id: 4, name: "David", email: "david@mail.com", role: "editor"},
  {id: 5, name: "Eve", email: "eve@mail.com", role: "viewer"},
  {id: 6, name: "Frank", email: "frank@mail.com", role: "admin"},
  {id: 7, name: "Grace", email: "grace@mail.com", role: "editor"},
  {id: 8, name: "Heidi", email: "heidi@mail.com", role: "viewer"},
  {id: 9, name: "Ivan", email: "ivan@mail.com", role: "editor"},
  {id: 10, name: "Judy", email: "judy@mail.com", role: "viewer"},
]

const getAllUsers = (req, res) => {
  const { role, sort, order, page, limit, q } = req.query

  let results = [...users]

  // Filtrering
  if(role) {
    results = results.filter(r => r.role === role)
  }

  // Sortering
  if(sort) {
    const direction = order === "desc" ? -1 : 1

    results = results.sort((a, b) => {
      if(a[sort] < b[sort]) return -1 * direction
      if(a[sort] > b[sort]) return 1 * direction
      return 0
    })
  }

  // Pagination
  const total = results.length
  const pageNum = parseInt(page) || 1
  const limitNum = parseInt(limit) || 4
  const totalPages = Math.ceil(total / limitNum)

  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum

  const pageData = results.slice(startIndex, endIndex)

  res.json({
    data: pageData,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
    }
  })
}

const getUserById = (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id));
	if (!user)
		return res.status(404).json({ message: "Användaren hittades inte", error: "user_not_found" });

	res.json(user);
}

const createUser = (req, res) => {
    const newUser = {id: users.length + 1, ...req.body}
    const email = req.body["email"] || ""
    if(!email) {
      return res.status(400).json({
        message: "Vänligen fyll i alla fält", error: "MISSING_FIELDS"
      })
    }
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