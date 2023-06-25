import { JSX } from 'solid-js'

export interface ButtonProps {
    children: JSX.Element
    onClick?: (event: Event) => void | undefined
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            button
            onClick={(ev: Event) => {
                if (props.onClick) {
                    props.onClick(ev)
                }
            }}
        >
            {props.children}
        </button>
    )
}
