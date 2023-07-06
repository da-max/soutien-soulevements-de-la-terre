import { Request } from 'express'

export const getAuthorizationToken = (request: Request): string | undefined => {
    return request.headers?.authorization?.split(' ')[1]
}
