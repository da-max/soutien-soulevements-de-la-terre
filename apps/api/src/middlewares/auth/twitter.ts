import { Request, Response, Router } from 'express'
import {
    TWITTER_COOKIE,
    TWITTER_STATE,
    twitterAuthClient,
} from '../../utils/twitter'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    const authUrl = twitterAuthClient.generateAuthURL({
        state: TWITTER_STATE,
        code_challenge: 'test',
        code_challenge_method: 'plain',
    })
    res.redirect(authUrl)
})
router.get('/callback', async (req: Request, res: Response) => {
    const now = new Date(Date.now())
    try {
        const { code, state } = req.query
        if (state !== TWITTER_STATE) {
            return res.status(500).send({ msg: 'State isn’t matching' })
        }
        const result = await twitterAuthClient.requestAccessToken(
            code as string
        )
        res.cookie(TWITTER_COOKIE, result.toString(), {
            expires: new Date(now.setDate(now.getDate() + 10)),
        })
        twitterAuthClient.token = result.token
        return res.send(result)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
