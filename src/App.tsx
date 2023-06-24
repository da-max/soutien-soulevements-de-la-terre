import { Card } from './components/Utils/Card'
import { InputFile } from './components/Utils/InputFile'
import '@unocss/reset/tailwind.css'
import { createSignal, onMount, Show } from 'solid-js'
import addon1 from './static/images/addon-1.png?url'
import addon2 from './static/images/addon-2.png?url'
import addon3 from './static/images/addon-3.png?url'
import addon4 from './static/images/addon-4.png?url'
import defaultPicture from './static/images/default.svg.webp?url'

import { useGenerateImage } from './hooks/utils'
import { AddonsList } from './components/AddonsList'
import { Button } from './components/Utils/Button'

const App = () => {
    const [image1Src, setImage1Src] = createSignal<string>()
    const [image2Src, setImage2Src] = createSignal<string>()

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
            bg-secondary
            bg-opacity-50
            min-h-screen
        >
            <Card>
                <h1 text-center font-bold text-10 font-handwriting>
                    Affiche ton soutien aux
                    <span text-primary> soulèvements de la terre</span>
                </h1>
                <div
                    flex
                    flex-gap-8
                    flex-justify-around
                    flex-items-center
                    mt-20
                    text-5
                >
                    <div flex flex-col flex-gap4>
                        <div>
                            <h2 mb-2>Choisi un overlay :</h2>
                            <AddonsList
                                addons={[addon1, addon2, addon3, addon4]}
                                onChange={onAddonChange}
                            />
                        </div>
                        <Show
                            when={
                                imageProperties().url ||
                                image2Src() ||
                                image1Src()
                            }
                        >
                            <img
                                b-rounded
                                src={
                                    imageProperties().url ||
                                    image2Src() ||
                                    image1Src()
                                }
                                alt=""
                                width={imageProperties().width}
                                height={imageProperties().height}
                            />
                            <div text-center>
                                <a href={imageProperties().url} download>
                                    <Button>
                                        <i i-tabler={'download'} mr-3 />
                                        Télécharger l’image
                                    </Button>
                                </a>
                            </div>
                        </Show>
                    </div>
                    <div>
                        <form flex flex-justify-center mt-8>
                            <InputFile name={'file'} onChange={onChange}>
                                <i i-tabler={'upload'} mr-3 />
                                Choisi une image
                            </InputFile>
                        </form>
                    </div>
                    <canvas
                        id={'canvas'}
                        hidden
                        ref={canvas}
                        height={imageProperties().height}
                        width={imageProperties().width}
                    />
                </div>
            </Card>
        </main>
    )
}

export default App
