import { Request, Response, Router } from 'express'
import { client } from '../../utils/facebook'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    const authUrl = client.getLoginUrl(['public_profile'])
    res.redirect(authUrl)
})

router.get('/callback', async (req: Request, res: Response) => {
    const now = new Date(Date.now())
    try {
        const { code } = req.query
        const response = await client.callback(code as string)
        console.log(response.data)
        res.cookie('facebook_token', response.data.access_token, {
            expires: new Date(now.setDate(now.getDate() + 10)),
        })
        res.send(response.data)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
