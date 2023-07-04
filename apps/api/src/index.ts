import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { router } from './middlewares/auth'
import { router as profil_router } from './middlewares/profil'
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()
const port = process.env.API_PORT || '3000'

app.use(cookieParser())
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})
app.use('/auth', router)
app.use('/profil', profil_router)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
