import { createEffect, JSX } from 'solid-js'

export interface InputProps {
    type: string
    value?: string
    onInput?: (event: Event) => void
}

export const Input = (props: InputProps): JSX.Element => {
    return (
        <input type={props.type} onChange={(ev: Event) => props.onInput(ev)} />
    )
}
