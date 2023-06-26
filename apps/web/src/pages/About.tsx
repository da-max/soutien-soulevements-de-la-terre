import { Title } from '../components/Utils/Title'
import { Card } from '../components/Utils/Card'
import { A } from '@solidjs/router'

export const About = () => {
    return (
        <main main flex={'~ col'} px-20>
            <Title class={'mt-20 mb-10'}>À propos</Title>
            <div>
                <A href={'/'} class={'mb-10 flex-inline flex-items-center'}>
                    <i i-tabler={'arrow-back'} mr-4 /> Revenir à l’application
                </A>
            </div>
            <Card>
                Ce projet est open-source, vous trouverez le code source ici :{' '}
                <a
                    href="https://github.com/Da-max/soutien-soulevements-de-la-terre"
                    link
                    target="_blank"
                >
                    https://github.com/Da-max/soutien-soulevements-de-la-terre
                </a>
            </Card>
        </main>
    )
}
