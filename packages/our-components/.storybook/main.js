module.exports = {
  stories: [
    '../stories/Introduction.stories.mdx',
    '../stories/*.stories.mdx',
    '../stories/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
}
