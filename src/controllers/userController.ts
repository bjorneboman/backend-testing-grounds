import type {Request, Response, NextFunction} from 'express'
import type {UserModel, UserResponse, CreateUserBody, UpdateUserBody} from '../types/index'

// In-memory 'db'
const users: UserModel[] = []
let nextId = 1

// Helper convert internal module to API-response
const toResponse = (user: UserModel): UserResponse => {
    const { passwordHash, ...rest} = user
    return rest
}

export const createUser = (req: Request<{}, {}, CreateUserBody>, res: Response<UserResponse>): void => {
    const {email, password} = req.body

    const newUser: UserModel = {
        id: nextId++,
        email,
        passwordHash: `hashed ${password}`,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    users.push(newUser)
    res.status(201).json(toResponse(newUser))
}