import { JSX } from 'solid-js'

export interface CardProps {
    children: JSX.Element
    class?: string
}

export const Card = (props: CardProps) => {
    return (
        <section bg-white p-10 rd-4 shadow-lg class={props.class}>
            {props.children}
        </section>
    )
}
