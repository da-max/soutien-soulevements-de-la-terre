import axios, { AxiosResponse } from 'axios'
import { SourceType, Token } from '@soutien-soulevements-de-la-terre/utils'
import { ProfileResponseData } from '../types/api'

export const useFetchCallback = (type: SourceType) => {
    const fetchCallback = async (
        code: string,
        state?: string
    ): Promise<Token | undefined> => {
        try {
            const res: AxiosResponse<Token> = await axios.get(
                `auth/${type}/callback?code=${code}${
                    state ? `&state=${state}` : ''
                }`
            )
            return res.data
        } catch (e) {
            console.log('An error occurred')
        }
    }

    return { fetchCallback }
}

export const useFetchProfile = () => {
    const fetchProfile = async (
        source: SourceType
    ): Promise<ProfileResponseData> => {
        try {
            const res: AxiosResponse<ProfileResponseData> = await axios.get(
                `profile/${source}`
            )
            return res.data
        } catch (e) {
            throw new Error('An error occurred')
        }
    }

    return { fetchProfile }
}
