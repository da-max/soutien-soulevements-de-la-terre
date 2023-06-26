import { Accessor, createEffect, createSignal } from 'solid-js'

export interface ImageProperties {
    x: number
    y: number
    width: number
    height: number
    url: string
}

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
    const ratio = Math.max(maxWidth / srcWidth, maxHeight / srcHeight)

    return { width: srcWidth * ratio, height: srcHeight * ratio }
}

export const useGenerateImage = (
    image1Url: Accessor<string>,
    image2Url: Accessor<string>,
    canvas: Accessor<HTMLCanvasElement | undefined>
): Accessor<ImageProperties> => {
    const [imageProperties, setImageProperties] = createSignal<ImageProperties>(
        {
            x: 0,
            y: 0,
            width: 400,
            height: 400,
            url: '',
        }
    )
    const generate = () => {
        if (canvas() && image2Url() && image1Url()) {
            const ctx = canvas().getContext('2d')
            ctx.clearRect(0, 0, canvas().width, canvas().height)
            const imageObj1 = new Image()
            const imageObj2 = new Image()

            imageObj1.src = image1Url()
            imageObj1.onload = () => {
                setImageProperties(
                    (oldValue: ImageProperties): ImageProperties => ({
                        ...oldValue,
                        ...calculateAspectRatioFit(
                            imageObj1.naturalWidth,
                            imageObj1.naturalHeight,
                            300,
                            300
                        ),
                    })
                )
                ctx.drawImage(
                    imageObj1,
                    imageProperties().x,
                    imageProperties().y,
                    imageProperties().width,
                    imageProperties().height
                )
                imageObj2.src = image2Url()

                imageObj2.onload = (): void => {
                    ctx.drawImage(
                        imageObj2,
                        imageProperties().x,
                        imageProperties().y,
                        imageProperties().width,
                        imageProperties().height
                    )
                    setImageProperties((oldValue: ImageProperties) => ({
                        ...oldValue,
                        url: canvas().toDataURL('image/png'),
                    }))
                }
            }
        }
    }

    createEffect(generate)
    return imageProperties
}
