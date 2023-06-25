import { JSX } from 'solid-js'

export interface TitleProps {
    children: JSX.Element
    class?: string
}

export const Title = (props: TitleProps) => {
    return (
        <h1 class={props.class} text={'center 10'} font={'handwriting'}>
            {props.children}
        </h1>
    )
}
