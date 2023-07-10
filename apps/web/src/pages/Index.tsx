import { createSignal, onMount, Show } from 'solid-js'

import { useGenerateImage } from '../hooks/useGenerateImage'
import { Card } from '../components/Utils/Card'
import { RenderImage } from '../components/RenderImage'
import { InputFile } from '../components/Utils/InputFile'
import { AddonsList } from '../components/AddonsList'

import addon1 from '../static/images/addon-1.png?url'
import addon2 from '../static/images/addon-2.png?url'
import addon3 from '../static/images/addon-3.png?url'
import addon4 from '../static/images/addon-4.png?url'
import defaultPicture from '../static/images/default.svg.webp?url'
import logo from '../static/images/bg.svg?url'
import { Title } from '../components/Utils/Title'
import { useSearchParams } from '@solidjs/router'
import { useFetchProfile } from '../hooks/useApi'
import { SourceType } from '@soutien-soulevements-de-la-terre/utils'
import { getSource } from '../utils'

export const Index = () => {
    const [image1Src, setImage1Src] = createSignal<string>(defaultPicture)
    const [image2Src, setImage2Src] = createSignal<string>(addon1)
    const [searchParams, setSearchParams] = useSearchParams()
    const { fetchProfile } = useFetchProfile()
    const source = getSource()

    let canvas: undefined | HTMLCanvasElement
    const [canvasSignal, setCanvasSignal] = createSignal<
        undefined | HTMLCanvasElement
    >(undefined)

    const imageProperties = useGenerateImage(image1Src, image2Src, canvasSignal)

    const onChange = (event: Event): void => {
        const files = (event.target as HTMLInputElement).files as FileList
        if (files[0]) {
            setImage1Src(URL.createObjectURL(files[0]))
        }
    }
    const onAddonChange = (addon: string): void => {
        setImage2Src(addon)
    }

    onMount(async () => {
        if (canvas) {
            setCanvasSignal(canvas)
        }

        const res = await fetchProfile(searchParams.source as SourceType)
        setImage1Src(res.url)

        if (source) {
            setSearchParams({ source })
        }
    })

    return (
        <main main grid="~ cols-[repeat(5, 1fr)]]">
            <div grid-row-start-1 grid-col-start-1 w="lg:200 20">
                <img
                    src={logo}
                    alt="Logo des soulèvements de la terre"
                    width={200}
                />
            </div>
            <Title
                class={'my-20 grid-col-start-1 grid-col-end-5 grid-row-start-1'}
            >
                Affiche ton soutien aux
                <span text={'primary'}> soulèvements de la terre</span>
            </Title>
            <Card
                class={
                    'lg:grid-col-start-3 grid-col-start-1 grid-col-end-5 grid-row-start-2 lg:mr-20 flex flex-col flex-items-center'
                }
            >
                <Show when={imageProperties().url}>
                    <RenderImage imageProperties={imageProperties()} />
                </Show>
            </Card>
            <Card
                class={
                    'grid-row-start-7 grid-row-end-8 lg:grid-col-end-2 grid-col-end-5 grid-col-start-1 lg:ml-20 my-20'
                }
            >
                <form text-center mb-8>
                    <div flex={'~ col items-center gap-4'} mb-4>
                        <InputFile name={'file'} onChange={onChange}>
                            <i i-tabler={'upload'} mr-3 />
                            Choisi une image
                        </InputFile>
                        <p
                            w={'50%'}
                            text-center
                            b-b={'1px solid #000'}
                            line-height={'0.1em'}
                            m={'10px 0 20px'}
                        >
                            <span bg={'#fff'} p={'0 10px'}>
                                Ou
                            </span>
                        </p>
                    </div>
                    <h3 text-left mb-3>
                        Récupère ta photo de profil depuis :
                    </h3>
                    <div flex={'~ col items-center gap-3'}>
                        <a
                            href={'http://localhost:3000/auth/twitter'}
                            button
                            bg={'#1d9bf0'}
                        >
                            <i i-tabler={'brand-twitter'} mr-3 /> Twitter
                        </a>
                        <a
                            href={'http://localhost:3000/auth/facebook'}
                            button
                            bg={'#2374e1'}
                        >
                            <i i-tabler={'brand-facebook'} mr-3 /> Facebook
                        </a>
                    </div>
                </form>
                <p
                    w={'100%'}
                    text-center
                    b-b={'1px solid #000'}
                    line-height={'0.1em'}
                    m={'10px 0 20px'}
                >
                    <span bg={'#fff'} p={'0 10px'}>
                        Puis
                    </span>
                </p>
                <h2 mb-2>Choisi un overlay :</h2>
                <AddonsList
                    selectedAddon={image2Src()}
                    addons={[addon1, addon2, addon3, addon4]}
                    onChange={onAddonChange}
                />
            </Card>
            <canvas
                id={'canvas'}
                hidden
                ref={canvas}
                height={imageProperties().height}
                width={imageProperties().width}
            />
        </main>
    )
}
