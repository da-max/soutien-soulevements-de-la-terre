import { defineConfig } from '@unocss/vite'
import { presetMini } from '@unocss/preset-mini'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import presetAttributify from '@unocss/preset-attributify'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
    presets: [presetMini(), presetAttributify(), presetWebFonts()],
    transformers: [transformerAttributifyJsx()],
    theme: {
        colors: {
            primary: '#e9527f',
            secondary: '#f9b130',
        },
    },
})
