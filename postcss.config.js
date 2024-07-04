module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: { preset: 'default' },
    'tailwindcss/nesting': {},
    'postcss-remove-nested-calc': {},
    'postcss-variable-compress': {},
    'postcss-deadcss': {}
  },
};
