import zod from 'zod'

const userSchema = zod.object({
    username: zod.string().min(4, { message: 'Username must contain at least 4 characters' }),
    email: zod.string().email({ message: 'Invalid email' }),
    password: zod.string().min(6, { message: 'Password must contain at least 6 characters' })
})

export function validateRegister(object) {
    return userSchema.safeParse(object)
}

export function validateLogin(object) {
    return userSchema.partial().safeParse(object)
}