import { Router } from 'express'
import { 
    register, 
    login, 
    logout,
    getUser
} from '../controllers/index.js'
import { 
    validateLoginData, 
    validateRegisterData,
    validateToken
} from '../middlewares/index.js';
export const authRouter = Router()

authRouter.post('/register', validateRegisterData, register)
authRouter.post('/login', validateLoginData, login)
authRouter.post('/logout', logout)
authRouter.get('/profile', validateToken, getUser)

