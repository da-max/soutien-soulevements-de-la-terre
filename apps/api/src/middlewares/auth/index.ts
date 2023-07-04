import { Router } from 'express'
import { router as twitter_router } from './twitter'
import { router as facebook_router } from './facebook'

const router = Router()

router.use('/twitter', twitter_router)
router.use('/facebook', facebook_router)

export { router }
