import { Request, Response, Router } from 'express'
import { SourceType } from '@soutien-soulevements-de-la-terre/utils'
import { client, TWITTER_COOKIE, twitterAuthClient } from '../utils/twitter'
import { client as redisClient } from '../utils/redis'
import {
    BUCKET_NAME,
    getObjectUrl,
    uploadImageFromUrlToBucket,
} from '../utils/s3'
import { getAuthorizationToken, getFileName } from '../utils'

const router = Router()

router.get('/twitter', async (req: Request, res: Response) => {
    try {
        if (!twitterAuthClient.token) {
            twitterAuthClient.token = {
                access_token: req.cookies[TWITTER_COOKIE] as string,
            }
        }
        const user = await client.users.findMyUser({
            'user.fields': ['profile_image_url'],
        })
        const image_url = user.data?.profile_image_url
        const id = user.data?.id

        if (image_url && id) {
            const name = `twitter/${id}`
            await uploadImageFromUrlToBucket(image_url, name)
            const result = await getObjectUrl({
                Key: name,
                Bucket: BUCKET_NAME,
            })
            res.send({ url: result })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Error occurred' })
    }
})

router.get('/facebook', async (req: Request, res: Response) => {
    try {
        const authorizationToken = getAuthorizationToken(req)
        if (authorizationToken) {
            const id = await redisClient.get(authorizationToken)
            if (id) {
                const name = getFileName(SourceType.FACEBOOK, id)
                const result = await getObjectUrl({
                    Key: name,
                    Bucket: BUCKET_NAME,
                })
                res.send({ url: result })
            } else {
                res.status(401).send({ msg: 'Token unknown' })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
