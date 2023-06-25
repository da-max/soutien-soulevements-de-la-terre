import { Card } from './components/Utils/Card'
import { InputFile } from './components/Utils/InputFile'
import '@unocss/reset/tailwind.css'
import { createSignal, onMount, Show } from 'solid-js'
import addon1 from './static/images/addon-1.png?url'
import addon2 from './static/images/addon-2.png?url'
import addon3 from './static/images/addon-3.png?url'
import addon4 from './static/images/addon-4.png?url'
import defaultPicture from './static/images/default.svg.webp?url'
import logo from './static/images/bg.svg?url'

import { useGenerateImage } from './hooks/utils'
import { AddonsList } from './components/AddonsList'
import { RenderImage } from './components/RenderImage'

const App = () => {
    const [image1Src, setImage1Src] = createSignal<string>(defaultPicture)
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
            font-sans
            bg-secondary
            bg-opacity-50
            text-5
            min-h-screen
            grid="~ cols-[repeat(5, 1fr)]]"
        >
            <div grid-row-start-1 grid-col-start-1>
                <img src={logo} alt="" width={200} />
            </div>
            <h1
                grid-row-start-1
                mt-20
                grid-col-start-1
                grid-col-end-5
                text-center
                font-bold
                text-10
                font-handwriting
            >
                Affiche ton soutien aux
                <span text-primary> soulèvements de la terre</span>
            </h1>
            <Card
                class={
                    'grid-col-start-3 grid-col-end-5 grid-row-start-2 mr-20 flex flex-col flex-items-center'
                }
            >
                <Show when={imageProperties().url}>
                    <RenderImage imageProperties={imageProperties()} />
                </Show>
            </Card>
            <Card
                class={
                    'grid-row-start-7 grid-row-end-8 grid-col-end-2 grid-col-start-1 ml-20 mb-20'
                }
            >
                <form text-center mb-8>
                    <InputFile name={'file'} onChange={onChange}>
                        <i i-tabler={'upload'} mr-3 />
                        Choisi une image
                    </InputFile>
                </form>
                <h2 mb-2>Choisi un overlay :</h2>
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

export default App
