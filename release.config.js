const manifestNs = require('./build/scripts/manifest').manifestNs;

module.exports = {
  branches: 'main',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'yarn set-plugin-version ${nextRelease.version}',
      },
    ],
    [
      '@amille/semantic-release-plugins/archive',
      {
        output: './' + manifestNs + '.streamDeckPlugin',
        assets: [
          {
            pattern: 'dist/' + manifestNs + '.sdPlugin/**',
            relative: 'dist',
          },
        ],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: './' + manifestNs + '.streamDeckPlugin',
          },
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'yarn.lock'],
      },
    ],
  ],
};
