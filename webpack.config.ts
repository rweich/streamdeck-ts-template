import * as path from 'path';
import * as webpack from 'webpack';
import copyWebpackPlugin from 'copy-webpack-plugin';
import manifest from './assets/manifest.json';

const config = (env: unknown, options: { mode: string; env: unknown }): webpack.Configuration => {
  const manifestNs = manifest.Actions[0].UUID.split('.').slice(1, -1).join('.');
  const manifestName = manifest.Name;
  let pluginNs = manifestNs;
  let pluginName = manifestName;

  if (options.mode === 'development') {
    pluginNs = 'dev.' + manifestNs;
    pluginName = manifestName + ' (dev)';
  }

  return {
    entry: {
      plugin: './src/plugin.ts',
      propertyinspector: './src/propertyinspector.ts',
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
              return content.toString().replace(manifestNs, pluginNs).replace(manifestName, pluginName);
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
