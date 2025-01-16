import { validateVideo } from '../schemas/index.js'

export function validateVideoData(req, res, next) {
    const result = validateVideo(req.body)
    if (result.error) {
        const errors = []
        result.error.issues.map(error => errors.push(error.message))
        return res.status(400).json(errors)
    }
    
    next()
}