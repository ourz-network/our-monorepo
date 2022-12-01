module.exports = {
  core: {
    builder: 'webpack5',
  },

  stories: [
    '../src/stories/Introduction.stories.mdx',
    '../src/stories/*.stories.mdx',
    '../src/stories/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    // 'storybook-addon-next',
  ],
  framework: '@storybook/react',
  features: {
    emotionAlias: false,
  },
}
