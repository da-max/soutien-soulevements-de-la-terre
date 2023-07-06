import { Request, Response, Router } from 'express'
import { client } from '../../utils/facebook'
import { Token } from '@soutien-soulevements-de-la-terre/utils'
const router = Router()

router.get('/', (req: Request, res: Response) => {
    const authUrl = client.getLoginUrl(['public_profile'])
    res.redirect(authUrl)
})

router.get('/callback', async (req: Request, res: Response) => {
    try {
        const { code } = req.query
        const response = await client.callback(code as string)
        res.send(response.data as Token)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
