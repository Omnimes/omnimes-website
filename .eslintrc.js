module.exports = {
  "$schema": "https://json.schemastore.org/eslintrc",
  root: true,
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: [
    "tailwindcss",
    "react",
    "react-hooks",
    "jsx-a11y",
    "prettier",
    "sonarjs",
    "security"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/no-contradicting-classname": "off",

    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'warn',

    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    'react/jsx-fragments': ['warn', 'syntax'], // Shorthand syntax for React fragments
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['ts', 'tsx'],
      },
    ],

    'prefer-const': 'warn',
    'no-var': 'warn',
    // 'no-unused-vars': 'warn',
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],

    // '@typescript-eslint/array-type': [
    //   'warn',
    //   {
    //     default: 'array',
    //   },
    // ],
    // '@typescript-eslint/consistent-type-assertions': [
    //   'warn',
    //   {
    //     assertionStyle: 'as',
    //     objectLiteralTypeAssertions: 'never',
    //   },
    // ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.js"
    },
    react: {
      version: "detect"
    },
    next: {
      rootDir: ["./"]
    }
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      // extends: [
      //   "plugin:@typescript-eslint/recommended",
      // ]
    }
  ],
  ignorePatterns: ["dist/*", ".cache", "public", "node_modules", "*.esm.js"],
};