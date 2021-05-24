import * as path from 'path';
import * as webpack from 'webpack';

import { manifestName, manifestNs } from './build/scripts/manifest';

import copyWebpackPlugin from 'copy-webpack-plugin';

const config = (environment: unknown, options: { mode: string; env: unknown }): webpack.Configuration => {
  let pluginNs = manifestNs;
  let pluginName = manifestName;

  if (options.mode === 'development') {
    pluginNs = 'dev.' + manifestNs;
    pluginName = manifestName + ' (dev)';
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
              if (!/\.(json|html)/.test(path)) {
                return content;
              }
              return content
                .toString()
                .replace(manifestNs, pluginNs)
                .replace('{{ PLUGIN_NS }}', pluginNs)
                .replace(manifestName, pluginName)
                .replace('{{ PLUGIN_NAME }}', pluginName);
            },
          },
        ],
      }),
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
