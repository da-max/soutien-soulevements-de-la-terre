import { Accessor, createSignal, For } from 'solid-js'

export interface AddonsListProps {
    addons: string[]
    onChange: (addon: string) => void
}

export const AddonsList = (props: AddonsListProps) => {
    const [image, setImage] = createSignal(undefined)
    return (
        <aside flex gap-4>
            <For each={props.addons}>
                {(addon: string, index: Accessor<number>) => (
                    <a
                        href="#"
                        onClick={(event: MouseEvent): void => {
                            setImage(addon)
                            event.preventDefault()
                            props.onChange(addon)
                        }}
                    >
                        <img
                            class={
                                image() === addon
                                    ? 'border-primary'
                                    : 'border-secondary'
                            }
                            border-3
                            cursor-pointer
                            height={75}
                            width={75}
                            src={addon}
                            alt={`Addon ${index()}`}
                        />
                    </a>
                )}
            </For>
        </aside>
    )
}
