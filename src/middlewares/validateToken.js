import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../utils/env.config.js'

export async function validateToken(req, res, next) {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized access to this account' })

    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).json({ message: 'Invalid token' })
        req.user = decoded
        next()
    })
}