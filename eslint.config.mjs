import eslint from '@eslint/js'
import { error } from 'console'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        ignores: [
            'dist',
            'node_modules',
            'eslint.config.mjs',
            'jest.config.js',
        ],
    },

    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,

    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'dot-notation': 'error',
        },
    },
)
