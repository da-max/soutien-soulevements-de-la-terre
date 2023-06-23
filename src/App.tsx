import { Card } from './components/Utils/Card'
import { InputFile } from './components/Utils/InputFile'
import '@unocss/reset/tailwind.css'
import { createSignal, onMount, Show } from 'solid-js'
import addon1 from './static/images/addon-1.png?url'
import addon2 from './static/images/addon-2.png?url'
import addon3 from './static/images/addon-3.png?url'
import addon4 from './static/images/addon-4.png?url'

import bg from './static/images/bg.png?url'
import { useGenerateImage } from './hooks/utils'
import { AddonsList } from './components/AddonsList'

const App = () => {
    const [image1Src, setImage1Src] = createSignal<string>()
    const [image2Src, setImage2Src] = createSignal<string>(addon1)

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

    onMount(() => {
        if (canvas) {
            setCanvasSignal(canvas)
        }
    })
    return (
        <main
            m-0
            p-0
            font-sans
            flex
            flex-justify-center
            flex-items-center
            min-h-screen
            bg={`url(${bg})`}
        >
            <Card>
                <div flex flex-gap-8>
                    <div>
                        <h1 text-center text-8>
                            Affiche ton soutien aux soulèvements de la terre
                        </h1>
                        <form flex flex-justify-center mt-8 text-5>
                            <InputFile name={'file'} onChange={onChange}>
                                Choisir une image
                            </InputFile>
                        </form>
                        <AddonsList
                            addons={[addon1, addon2, addon3, addon4]}
                            onChange={onAddonChange}
                        />
                    </div>
                    <canvas
                        id={'canvas'}
                        hidden
                        ref={canvas}
                        height={imageProperties().height}
                        width={imageProperties().width}
                    />
                    <Show when={imageProperties().url}>
                        <div flex flex-col>
                            <img
                                src={imageProperties().url}
                                alt=""
                                width={imageProperties().width}
                                height={imageProperties().height}
                            />
                            <div>
                                <a
                                    href={imageProperties().url}
                                    target="_blank"
                                    download
                                    transition
                                    bg-primary
                                    px-4
                                    py-2
                                    rd-4
                                    hover-bg-secondary
                                    cursor-pointer
                                    shadow-md
                                >
                                    Télécharger l’image
                                </a>
                            </div>
                        </div>
                    </Show>
                </div>
            </Card>
        </main>
    )
}

export default App
