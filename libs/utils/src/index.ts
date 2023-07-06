import { SourceType } from './types'

export * from './types'

export const getTokenName = (source: SourceType): string => {
    switch (source) {
        case SourceType.FACEBOOK:
            return 'facebook_token'
        case SourceType.TWITTER:
            return 'twitter_token'
    }
}
