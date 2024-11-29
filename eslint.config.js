import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import typescriptEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default [
  ...typescriptEslint.config(
    { ignores: ['dist'] },
    {
      extends: [js.configs.recommended, ...typescriptEslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
      plugins: {
        react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'jsx-a11y': jsxA11y,
        prettier,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'react/self-closing-comp': 'warn',
        ...reactHooks.configs.recommended.rules,
        ...jsxA11y.configs.recommended.rules,
        'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prettier/prettier': 'warn',
      },
      settings: {
        react: { version: 'detect' },
      },
    },
  ),
  ...tailwindcss.configs['flat/recommended'],
  eslintConfigPrettier,
]
