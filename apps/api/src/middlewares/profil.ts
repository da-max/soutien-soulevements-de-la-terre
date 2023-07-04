import { Request, Response, Router } from 'express'
import { client, TWITTER_COOKIE, twitterAuthClient } from '../utils/twitter'
import { client as facebookClient, FACEBOOK_COOKIE } from '../utils/facebook'

const router = Router()

router.get('/twitter', async (req: Request, res: Response) => {
    try {
        if (!twitterAuthClient.token) {
            twitterAuthClient.token = JSON.parse(
                req.cookies[TWITTER_COOKIE]
            ).token
        }
        const user = await client.users.findMyUser({
            'user.fields': ['profile_image_url'],
        })
        res.send(user.data)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

router.get('/facebook', async (req: Request, res: Response) => {
    try {
        if (!facebookClient.getAccessToken()) {
            facebookClient.setAccessToken(req.cookies[FACEBOOK_COOKIE])
        }
        const user = await facebookClient.get('/me?fields=picture')
        console.log(user)
        res.send(user.data)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
