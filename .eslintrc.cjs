module.exports = {
  root: true,

  env: {
    node: true,
  },

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'html'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },
};
