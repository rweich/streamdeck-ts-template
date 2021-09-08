import * as path from 'path';
import * as webpack from 'webpack';

import { createDevelopmentManifest, manifestNs } from './build/scripts/manifest';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import copyWebpackPlugin from 'copy-webpack-plugin';

const config = (environment: unknown, options: { mode: string; env: unknown }): webpack.Configuration => {
  let pluginNs = manifestNs;

  if (options.mode === 'development') {
    pluginNs = 'dev.' + manifestNs;
  }

  return {
    entry: {
      plugin: './build/entries/PluginEntry.ts',
      propertyinspector: './build/entries/PropertyinspectorEntry.ts',
    },
    target: 'web',
    output: {
      library: 'connectElgatoStreamDeckSocket',
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist/' + pluginNs + '.sdPlugin/js'),
    },
    plugins: [
      new copyWebpackPlugin({
        patterns: [
          {
            from: 'assets',
            to: path.resolve(__dirname, 'dist/' + pluginNs + '.sdPlugin'),
            toType: 'dir',
            transform: (content, path) => {
              if (options.mode === 'development' && /manifest\.json$/.test(path)) {
                return createDevelopmentManifest();
              }
              if (!/\.html/.test(path)) {
                return content;
              }
              return content.toString().replace('{{ PLUGIN_NS }}', pluginNs);
            },
          },
        ],
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: [
            {
              loader: 'source-map-loader',
              options: {
                filterSourceMappingUrl: () => false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    optimization: {
      splitChunks: {},
    },
  };
};

export default config;
