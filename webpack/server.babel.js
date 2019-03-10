// server.babel.js

// https://medium.com/front-end-hacking/adding-a-server-side-rendering-support-for-an-existing-react-application-using-express-and-webpack-5a3d60cf9762

import fs from 'fs';
import {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  optimize,
} from 'webpack';
import os from 'os';
import HappyPack, { ThreadPool } from 'happypack';
import EnvConfig from '../config.json';

const happyThreadPool = ThreadPool({ size: os.cpus().length });
const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'production';
const isProd = 'production' === nodeEnv;
const plugins = [
  new EnvironmentPlugin(EnvConfig),
  // Prevent get loading component on SSR.
  new optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPool,
    debug: false,
    verbose: false,
    loaders: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
  }),
];

// Use our own externals instead of `webpack-node-externals` to prevent get loading component on SSR.
const externals = fs
  .readdirSync('./node_modules')
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});
externals['react-dom/server'] = 'commonjs react-dom/server';

export default {
  target: 'node',
  node: {
    __dirname: false,
  },
  externals,
  entry: {
    index: ['./src/server/index.js'],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/../dist/server/`,
    publicPath: isProd ? '/' : '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'happypack/loader?id=babel' }],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|ttf|eof|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: 'file-loader',
              name: isProd ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]',
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  mode: isProd ? 'production' : 'development',
  plugins: plugins,
};
