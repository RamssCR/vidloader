import { validateRegister, validateLogin } from '../schemas/index.js'

export function validateRegisterData(req, res, next) {
    const result = validateRegister(req.body)
    if (result.error) {
        const errors = []
        result.error.issues.map(error => errors.push(error.message))
        return res.status(400).json(errors)
    }

    next()
}

export function validateLoginData(req, res, next) {
    const result = validateLogin(req.body)
    if (result.error) {
        const errors = []
        result.error.issues.map(error => errors.push(error.message))
        return res.status(400).json(errors)
    }

    next()
}