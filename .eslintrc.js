/* eslint-disable no-undef */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint']
};
