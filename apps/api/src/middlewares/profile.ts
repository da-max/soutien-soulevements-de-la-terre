import { Request, Response, Router } from 'express'
import { SourceType } from '@soutien-soulevements-de-la-terre/utils'
import { client as redisClient } from '../utils/redis'
import { BUCKET_NAME, getObjectUrl } from '../utils/s3'
import { getAuthorizationToken, getFileName } from '../utils'

const router = Router()

router.get('/twitter', async (req: Request, res: Response) => {
    try {
        const authorizationToken = getAuthorizationToken(req)
        if (authorizationToken) {
            const id = await redisClient.get(authorizationToken)
            if (id) {
                const name = getFileName(SourceType.TWITTER, id)
                const result = await getObjectUrl({
                    Key: name,
                    Bucket: BUCKET_NAME,
                })
                res.send({ url: result })
            } else {
                res.status(401).send({ msg: 'Token unknown' })
            }
        } else {
            res.status(401).send({ msg: 'Token is missing' })
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
        } else {
            res.status(401).send({ msg: 'Token is missing' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Error occurred' })
    }
})

export { router }
