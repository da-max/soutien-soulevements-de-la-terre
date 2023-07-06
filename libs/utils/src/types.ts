export interface name {
    a: string
}

export enum SourceType {
    FACEBOOK = 'facebook',
    TWITTER = 'twitter',
}

export type Token = {
    access_token: string
    expires_in: number
    token_type: 'Bearer'
}
