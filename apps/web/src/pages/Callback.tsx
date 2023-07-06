import { Title } from '../components/Utils/Title'
import { useNavigate, useParams, useSearchParams } from '@solidjs/router'
import { onMount } from 'solid-js'
import { CallbackType, useFetchCallback } from '../hooks/useApi'
import { setToken } from '../utils'

export const Callback = () => {
    const [searchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    const { fetchCallback } = useFetchCallback(params.type as CallbackType)
    onMount(async () => {
        if (searchParams.code) {
            const res = await fetchCallback(
                searchParams.code,
                searchParams.state
            )
            if (res) {
                setToken(res)
            }
        }
        navigate(`/?source=${params.type}`, { replace: true })
    })

    return (
        <div main flex={'~ justify-center items-center'}>
            <Title class={'inline-flex flex-items-center'}>
                <i i-tabler="loader-2" class={'animate-rotation'} mr-3 />
                Chargement en cours…
            </Title>
        </div>
    )
}
