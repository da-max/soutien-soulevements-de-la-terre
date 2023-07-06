import { Token } from '@soutien-soulevements-de-la-terre/utils'
import axios from 'axios'

export const TOKEN_NAME = 'token'

export const getToken = (): Token | undefined => {
    const token = localStorage.getItem(TOKEN_NAME)
    return token ? JSON.parse(token) : token
}

export const setToken = (token: Token) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
    setTokenAxiosHeader()
}

export const setTokenAxiosHeader = () => {
    const token = getToken()
    if (token) {
        axios.defaults.headers[
            'authorization'
        ] = `${token.token_type} ${token.access_token}`
    }
}
