import { auth, Client } from 'twitter-api-sdk'

export const TWITTER_STATE = process.env.TWITTER_STATE as string
export const TWITTER_COOKIE = 'twitter_token'

export const twitterAuthClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_ID as string,
    client_secret: process.env.TWITTER_SECRET as string,
    callback: process.env.CALLBACK as string,
    scopes: ['tweet.read', 'tweet.write', 'users.read'],
})

export const client = new Client(twitterAuthClient)
