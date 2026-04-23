const express = require('express')
import type {Request, Response, NextFunction} from 'express'

const app = express()
app.use(express.json())

interface User {
    id: number,
    name: string,
    email: string
}



const users: User[] = [
    {id: 1, name: "Nisse", email: "nisse@mail.com"},
    {id: 2, name: "Kalle", email: "kalle@mail.com"}
]

interface UserParams {
    id: string
}

interface CreateUserBody {
    name: string,
    email: string
}

interface UpdateUserBody {
    name?: string,
    email?: string
}

let nextId = users.length +1

app.get('/', (req: Request, res: Response): void => {
    res.json({message: 'API is ready'})
})

app.get('/users/', (req: Request, res: Response): void => {
    res.json(users)
})

app.get('/users/:id', (req: Request<UserParams>, res: Response): void => {
    const id = parseInt(req.params.id)
    const user = users.find((u => u.id === id))

    if(!user) {
        res.status(404).json({message: 'User could not be located'})
        return
    }

    res.json(user)
})

app.post('/users', (req: Request<{}, {}, CreateUserBody>, res: Response): void => {
    const {name, email} = req.body

    if(!name || !email) {
        res.status(400).json({message: 'Name and email are required'})
        return
    }

    const newUser: User = { id: nextId++, name, email }
    users.push(newUser)

    res.status(201).json(newUser)
})

app.put('/users/:id', (req: Request<UserParams, {}, UpdateUserBody>, res: Response) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)

    if(!user) {
        res.status(404).json({message: 'User could not be located'})
        return
    }
    const {name, email} = req.body
    if(name) user.name = name
    if(email) user.email = email

    res.status(200).json(user)
})

app.delete('/users/:id', (req: Request<UserParams>, res: Response): void => {
    const userId = parseInt(req.params.id)
    const deletionIndex = users.findIndex(u => u.id === userId)

    console.log(deletionIndex);
    
    if(deletionIndex < 0) {
        res.status(404).json({message: 'No user to delete'})
        return
    }
    users.splice(deletionIndex, 1)

    res.status(204).send()
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server listening to http://localhost:${PORT}`);
})

