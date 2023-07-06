import { Accessor, createEffect, createSignal } from 'solid-js'

export interface ImageProperties {
    x: number
    y: number
    width: number
    height: number
    url: string
}

const calculateAspectRatioFit = (
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
) => {
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
            const ctx = (canvas() as HTMLCanvasElement).getContext('2d')
            if (ctx) {
                ctx.clearRect(
                    0,
                    0,
                    (canvas() as HTMLCanvasElement).width,
                    (canvas() as HTMLCanvasElement).height
                )
                const imageObj1 = new Image()
                const imageObj2 = new Image()

                imageObj1.src = image1Url()
                imageObj1.crossOrigin = 'anonymous'
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
                            x: oldValue.x,
                            y: oldValue.y,
                            width: oldValue.width,
                            height: oldValue.height,
                            url: (canvas() as HTMLCanvasElement).toDataURL(
                                'image/png'
                            ),
                        }))
                    }
                }
            }
        }
    }

    createEffect(generate)
    return imageProperties
}
