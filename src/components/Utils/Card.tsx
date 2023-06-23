import { JSX } from 'solid-js'

export interface CardProps {
    children: JSX.Element
}

export const Card = (props: CardProps) => {
    return (
        <section bg-white p-20 rd-4 shadow-lg>
            {props.children}
        </section>
    )
}
