module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  ignorePatterns: ['src/stories/**', 'node_modules', 'tests/**'],
}
