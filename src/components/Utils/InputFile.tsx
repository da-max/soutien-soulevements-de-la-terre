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
            <label
                for={props.name}
                transition
                bg-primary
                px-4
                py-2
                rd-4
                hover-bg-secondary
                cursor-pointer
                shadow-md
            >
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
