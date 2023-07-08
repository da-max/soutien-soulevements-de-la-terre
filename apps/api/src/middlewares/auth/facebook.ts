import { Request, Response, Router } from 'express'
import { client } from '../../utils/facebook'
import { Token, SourceType } from '@soutien-soulevements-de-la-terre/utils'
import { uploadImageFromUrlToBucket } from '../../utils/s3'
import { getFileName } from '../../utils'
import { client as redisClient } from '../../utils/redis'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    const authUrl = client.getLoginUrl(['public_profile'])
    res.redirect(authUrl)
})

router.get('/callback', async (req: Request, res: Response) => {
    try {
        const { code } = req.query
        const response = await client.callback(code as string)
        const token = response.data as Token
        client.setAccessToken(token.access_token)
        const user = await client.get('/me?fields=picture')
        const id = user.data.id
        const name = getFileName(SourceType.FACEBOOK, id)
        await uploadImageFromUrlToBucket(user.data.picture.data.url, name)
        await redisClient.set(token.access_token, id)
        await redisClient.expireAt(
            token.access_token,
            parseInt(`+${Date.now() / 1000}`) + token.expires_in
        )
        res.send(token)
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
