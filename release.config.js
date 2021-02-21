const manifest = require('./assets/manifest.json');
const manifestNs = manifest.Actions[0].UUID.split('.').slice(1, -1).join('.');

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
