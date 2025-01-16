import { connect } from 'mongoose'
import { DB_URL } from './env.config.js'

export const connectDB = async () => {
    try {
        await connect(DB_URL)
        console.log('connected to database')
    } catch (error) {
        console.error(error)
    }
} 