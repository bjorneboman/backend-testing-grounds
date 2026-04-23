// Internal Datamodel -- SSOT (Single Source of Truth)
export interface UserModel {
    id: number,
    email: string,
    passwordHash: string,
    role: 'user' | 'admin'
    createdAt: Date,
    updatedAt: Date,
}

// API representation - everything but the sensitive field
export type UserResponse = Omit<UserModel, 'passwordHash' | 'role'>

// Body type for POST /users
// Client sends email + clean text
export type CreateUserBody = Pick<UserModel, 'email'> & {
    password: string
}

// Body types for PATCH /users/:id
// All fields are optional, we do not allow updating of id or hash
export type UpdateUserBody = Partial<Pick<UserModel, 'email' | 'role'>>


