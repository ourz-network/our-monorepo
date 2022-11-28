module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  rules: {
    'import/no-cycle': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
  ignorePatterns: ['node_modules', 'tests/**'],
};
