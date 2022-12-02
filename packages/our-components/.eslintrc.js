module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  ignorePatterns: ['src/stories/**', 'node_modules', 'tests/**'],
  rules: {
    'no-nested-ternary': 'off',
    'no-empty': 'off',
    'prefer-template': 'off',
    'arrow-body-style': 'off',
    'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unused-prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
}
