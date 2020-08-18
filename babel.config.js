module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Explorer >= 11',
          ],
          node: 'current',
        },
        modules: false,
        useBuiltIns: 'entry',
        loose: true,
        corejs: 2,
      },
    ],
  ],
  env: {
    test: {
      plugins: [],
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
};
