import { Request, Response, Router } from 'express'
import { TWITTER_STATE, twitterAuthClient } from '../../utils/twitter'
import { Token } from '@soutien-soulevements-de-la-terre/utils'

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
    try {
        const { code, state } = req.query
        if (state !== TWITTER_STATE) {
            return res.status(500).send({ msg: 'State isn’t matching' })
        }
        const result = await twitterAuthClient.requestAccessToken(
            code as string
        )
        twitterAuthClient.token = result.token
        res.send(result.token as Token)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
