import Facebook from 'facebook-js-sdk'
export const FACEBOOK_CALLBACK = process.env.FACEBOOK_CALLBACK as string
export const FACEBOOK_COOKIE = 'facebook_token'
export const FACEBOOK_STATE = process.env.FACEBOOK_STATE as string

export const client = new Facebook({
    appId: process.env.FACEBOOK_ID as string,
    appSecret: process.env.FACEBOOK_SECRET as string,
    graphVersion: 'v17.0',
    redirectUrl: FACEBOOK_CALLBACK,
})
