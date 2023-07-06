import { Request, Response, Router } from 'express'
import { client, TWITTER_COOKIE, twitterAuthClient } from '../utils/twitter'
import { client as facebookClient } from '../utils/facebook'
import {
    BUCKET_NAME,
    getObjectUrl,
    uploadImageFromUrlToBucket,
} from '../utils/s3'
import { getAuthorizationToken } from '../utils'

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
        res.status(500).send({ msg: 'Error occurred' })
    }
})

router.get('/facebook', async (req: Request, res: Response) => {
    try {
        const authorizationToken = getAuthorizationToken(req)
        if (!facebookClient.getAccessToken() && authorizationToken) {
            facebookClient.setAccessToken(authorizationToken)
        }
        const user = await facebookClient.get('/me?fields=picture')
        const image_url = user.data.picture.data.url
        const id = user.data.id
        if (image_url && id) {
            const name = `facebook/${id}`
            await uploadImageFromUrlToBucket(image_url, name)
            const result = await getObjectUrl({
                Key: name,
                Bucket: BUCKET_NAME,
            })
            res.send({ url: result })
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
