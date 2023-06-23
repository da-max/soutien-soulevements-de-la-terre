import { Accessor, For } from 'solid-js'

export interface AddonsListProps {
    addons: string[]
    onChange: (addon: string) => void
}

export const AddonsList = (props: AddonsListProps) => {
    return (
        <aside flex gap-4>
            <For each={props.addons}>
                {(addon: string, index: Accessor<number>) => (
                    <a href="#" onClick={() => props.onChange(addon)}>
                        <img
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
