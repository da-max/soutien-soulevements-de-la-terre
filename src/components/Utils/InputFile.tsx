import { JSX } from 'solid-js'

export interface InputFileProps {
    name: string
    children: JSX.Element
    preview?: boolean
    onChange: (event: Event) => void
}

export const InputFile = (props: InputFileProps) => {
    return (
        <div>
            <label button for={props.name}>
                {props.children}
            </label>
            <input
                type="file"
                name={props.name}
                id={props.name}
                hidden
                accept="image/*"
                onChange={(event: Event) => props.onChange(event)}
            />
        </div>
    )
}
