import { defineConfig } from '@unocss/vite'
import { presetMini } from '@unocss/preset-mini'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import presetAttributify from '@unocss/preset-attributify'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
    presets: [
        presetIcons({
            collections: {
                tabler: () =>
                    import('@iconify-json/tabler/icons.json').then(
                        (i) => i.default
                    ),
            },
        }),
        presetMini(),
        presetAttributify(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Roboto',
                handwriting: 'Dekko',
            },
        }),
    ],
    transformers: [transformerAttributifyJsx()],
    theme: {
        colors: {
            primary: '#df5d5d',
            secondary: '#f2d86d',
        },
    },
    shortcuts: {
        button: 'transition px-4 py-2 rd-4 bg-primary hover-bg-secondary cursor-pointer shadow-md flex-inline flex-items-center',
    },
})
