import { ImageProperties } from '../hooks/utils'

export interface RenderImageProps {
    imageProperties: ImageProperties
}

export const RenderImage = (props: RenderImageProps) => {
    return (
        <div text-center>
            <img
                src={props.imageProperties.url}
                alt=""
                width={props.imageProperties.width}
                height={props.imageProperties.height}
                mb-8
            />
            <a button href={props.imageProperties.url} download>
                <i i-tabler={'download'} mr-3 />
                Télécharger l’image
            </a>
        </div>
    )
}
