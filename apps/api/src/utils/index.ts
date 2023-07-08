import { Request } from 'express'
import { SourceType } from '@soutien-soulevements-de-la-terre/utils'

export const getAuthorizationToken = (request: Request): string | undefined => {
    return request.headers?.authorization?.split(' ')[1]
}

export const getFileName = (source: SourceType, name: string) => {
    return `${source}/${name}`
}
