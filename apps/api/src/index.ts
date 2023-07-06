import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { router } from './middlewares/auth'
import { router as profile_router } from './middlewares/profile'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.API_PORT || '3000'

app.use(cookieParser())

if (process.env.DEV) {
    app.use(cors())
}

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})
app.use('/auth', router)
app.use('/profile', profile_router)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
