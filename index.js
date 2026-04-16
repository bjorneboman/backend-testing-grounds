const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || "server_jwt_token"

const users = []

const SALT_ROUNDS = 12

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({error: "Ingen token i header"})
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err) {
            return res.status(403).json({ error: "Ogiltig eller utgången token"})
        }

        req.user = payload

        next()
    })
}

app.post("/register", async (req, res) => {
    const { username, password } = req.body

    if(!username || !password)
        return res.status(400).json({ error: "Användarnamn och lösen krävs"})

    if(users.find(u => u.usernamn === username)) {
        return res.status(409).json({ error: "Användarnamnet är upptaget" })
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    const user = {
        username, 
        passwordHash
    }
 
    users.push(user)

    return res.status(201).json({message: "Användare skapad"})
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body

    const user = users.find(u => u.username === username)

    const dummyHash = "jalsdjfLASlksjei^ldkjfalvvaölskdjhföklanvvv3453jvlög4r4i"
    const hashToCheck = user ? user.passwordHash : dummyHash

    const valid = await bcrypt.compare(password, hashToCheck)

    if(!user || !valid) {
        return res.status(401).json({ error: "Fel användarnamn eller lösenord" })
    }

    const token = jwt.sign( { id: 2, username}, JWT_SECRET, { expiresIn: "1h"})

    return res.json({ token })


    return res.status(401).json({ error: "Fel användarnamn eller lösen"})
})

app.get("/profiles", authenticateToken, (req, res) => {
    res.json({message: "HEEEEJ " + req.user.username, user: req.user})
})

app.listen(3000, () => { console.log("Servern smyglyssnar på port 3000");})