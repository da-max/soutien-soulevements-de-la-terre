import { Request, Response, Router } from 'express'
import { client, TWITTER_STATE, twitterAuthClient } from '../../utils/twitter'
import { Token } from '@soutien-soulevements-de-la-terre/utils'
import { getFileName } from '../../utils'
import { SourceType } from '@soutien-soulevements-de-la-terre/utils'
import { uploadImageFromUrlToBucket } from '../../utils/s3'
import { client as redisClient } from '../../utils/redis'

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
        const user = await client.users.findMyUser({
            'user.fields': ['profile_image_url'],
        })
        const data = user.data
        if (
            data &&
            data.profile_image_url &&
            result.token.access_token &&
            result.token.expires_at
        ) {
            const id = data.id
            const name = getFileName(SourceType.FACEBOOK, id)
            await uploadImageFromUrlToBucket(data.profile_image_url, name)
            await redisClient.set(result.token.access_token, id)
            await redisClient.expireAt(
                result.token.access_token,
                parseInt(`+${Date.now() / 1000}`) + result.token.expires_at
            )
            res.send(result.token as Token)
        } else {
            res.status(500).send({ msg: 'Cannot get data from twitter' })
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
