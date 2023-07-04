declare module 'facebook-js-sdk' {
    import { Response } from 'express'

    export interface FacebookProps {
        appId: string
        appSecret: string
        redirectUrl: string
        graphVersion?: string
    }

    class Facebook {
        constructor(props: FacebookProps)
        setAccessToken: (el: string) => void
        getLoginUrl: (scopes: string[]) => string
        getAccessToken: () => string
        getBaseUrl: () => string
        callback: (
            code: string
        ) => Promise<Union<Response, { data: { [string]: unknown } }>>
        get: (
            path: string,
            accessToken?: string
        ) => Promise<Union<Response, { data: { [string]: unknown } }>>
        post: (
            path: string,
            options: { [string]: unknown },
            accessToken: string
        ) => Promise<Response>
        delete: (path: string) => Promise<Response>
    }

    export default Facebook
}
