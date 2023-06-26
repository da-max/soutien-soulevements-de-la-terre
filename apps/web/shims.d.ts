import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'solid-js' {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars
        interface HTMLAttributes<T> extends AttributifyAttributes {
            // Add shortcuts…
            button?: boolean
            main?: boolean
        }
    }
}
