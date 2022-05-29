'use strict';
module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 1,
    '@typescript-eslint/no-unused-vars': [
      1,
      { argsIgnorePattern: '^_', ignoreRestSiblings: true, args: 'none' },
    ],
  },
};
