import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../utils/env.config.js';

export function createToken(payload) {
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' })
            resolve(token)
        } catch (error) {
            reject(error.message)
        }
    })
}