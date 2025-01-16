import express, { json, static as static_ } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { join } from 'node:path'
import cookieParser from 'cookie-parser'
import { PORT } from './utils/env.config.js'
import { __dirname } from './utils/__dirname.js'
import { connectDB } from './utils/db.config.js'
import { authRouter, videoRouter } from './routes/index.js'


const app = express()

app.use(json())
app.use(cookieParser())
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev'))

app.use('/app/videos', static_(join(__dirname, '../uploads')))

connectDB()

app.use('/', authRouter)
app.use('/app', videoRouter)

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))