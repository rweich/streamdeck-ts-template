const manifestNs = require('./build/scripts/manifest').manifestNs;

module.exports = {
  branches: 'main',
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        "releaseRules": [
          { "type": "chore", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "release": "patch" },
          { "type": "style", "release": "patch" }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    [
      "@semantic-release/changelog",
      {
        "changelogTitle": "# Changelog\n\nAll notable changes to this project will be documented in this file. See\n[Conventional Commits](https://conventionalcommits.org) for commit guidelines."
      }
    ],
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
