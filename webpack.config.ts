import * as path from 'path';
import * as webpack from 'webpack';
import copyWebpackPlugin from 'copy-webpack-plugin';
import { manifestNs, manifestName } from './build/scripts/manifest';

const config = (env: unknown, options: { mode: string; env: unknown }): webpack.Configuration => {
  let pluginNs = manifestNs;
  let pluginName = manifestName;

  if (options.mode === 'development') {
    pluginNs = 'dev.' + manifestNs;
    pluginName = manifestName + ' (dev)';
  }

  return {
    entry: {
      plugin: './build/entries/pluginEntry.ts',
      propertyinspector: './build/entries/propertyinspectorEntry.ts',
    },
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist/' + pluginNs + '.sdPlugin/js'),
      library: 'connectElgatoStreamDeckSocket',
      libraryExport: 'default',
    },
    plugins: [
      new copyWebpackPlugin({
        patterns: [
          {
            from: 'assets',
            to: path.resolve(__dirname, 'dist/' + pluginNs + '.sdPlugin'),
            toType: 'dir',
            transform: (content, path) => {
              if (!path.match(/\.(json|html)/)) {
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
