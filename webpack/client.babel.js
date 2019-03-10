// client.babel.js
import {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
} from 'webpack';

import os from 'os';
import HappyPack, { ThreadPool } from 'happypack';
import StatsPlugin from 'stats-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import EnvConfig from '../config.json';
import TerserPlugin from 'terser-webpack-plugin';
import gifsicle from 'imagemin-gifsicle';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import svgo from 'imagemin-svgo';

const happyThreadPool = ThreadPool({ size: os.cpus().length });
const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'production';
const isProd = 'production' === nodeEnv;
const faviconPath = `${__dirname}/../src/client/img/favicon.svg`;
const plugins = [
  new EnvironmentPlugin(EnvConfig),
  new StatsPlugin('stats.json'),
  new WebpackPwaManifest({
    name: 'WebGL2',
    description: 'Demo of WebGL2',
    theme_color: '#191919',
    background_color: '#191919',
    inject: false,
    fingerprints: isProd,
    start_url: '/?utm_source=homescreen',
    icons: [
      {
        src: faviconPath,
        sizes: [96, 128, 192, 256, 384, 512],
        destination: 'img/',
      },
      {
        src: faviconPath.replace(/svg$/i, 'png'),
        sizes: [36, 48, 72, 96, 144, 192, 512],
        destination: 'img/',
      },
    ],
  }),
  new SWPrecacheWebpackPlugin({
    cacheId: 'webgl2-demoreel-precache',
    filepath: `${__dirname}/../dist/client/${
      EnvConfig.SERVICE_WORKER_FILENAME
    }`,
    stripPrefix: '/workspace/dist/client',
    maximumFileSizeToCacheInBytes: 4194304,
    minify: isProd,
    staticFileGlobsIgnorePatterns: [],
    importScripts: [{ chunkName: 'serviceWorker' }],
  }),
  new LodashModuleReplacementPlugin(),
  new HappyPack({
    id: 'eslint',
    threadPool: happyThreadPool,
    debug: false,
    verbose: false,
    loaders: ['eslint-loader'],
  }),
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPool,
    debug: false,
    verbose: false,
    loaders: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
  }),
];
const devPlugins = [
  new HotModuleReplacementPlugin(),
  new NoEmitOnErrorsPlugin(),
];
const prodPlugins = [
  new FaviconsWebpackPlugin({
    logo: faviconPath,
    prefix: isProd ? 'img/favicon.[hash:8].' : 'img/favicon.',
    inject: false,
    title: 'WebGL2',
    background: '#191919',
  }),
];

if (process.env.BUNDLE_ANALYSE) {
  prodPlugins.push(new BundleAnalyzerPlugin());
}

// hot middleware
export const hmrConfig = {
  path: '/__webpack_hmr',
  timeout: 20000,
  reload: true,
  logLevel: 'warn',
  log: console.log,
  heartbeat: 10 * 1000,
};
const hotMiddlewareScript = `webpack-hot-middleware/client?path=${
  hmrConfig.path
}&timeout=${hmrConfig.timeout}&reload=${hmrConfig.reload}`;

const bundle = ['./src/client/js/index.js'];
const devBundle = [hotMiddlewareScript];

export default {
  name: 'client',
  entry: {
    bundle: isProd ? bundle : [...bundle, ...devBundle],
    serviceWorker: ['./src/client/js/serviceWorker.js'],
  },
  output: {
    filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
    path: `${__dirname}/../dist/client/`,
    publicPath: '/',
    globalObject: "(typeof self !== 'undefined' ? self : this)",
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'happypack/loader', options: { id: 'eslint' } }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'happypack/loader', options: { id: 'babel' } }],
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
            },
          },
          {
            loader: 'img-loader',
            options: {
              enabled: isProd,
              plugins: [
                gifsicle({ interlaced: false }),
                mozjpeg({ progressive: true, arithmetic: false }),
                pngquant({ floyd: 0.5, speed: 2 }),
                svgo({
                  plugins: [{ removeTitle: true }, { convertPathData: false }],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
  plugins: isProd ? [...plugins, ...prodPlugins] : [...plugins, ...devPlugins],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: chunk => chunk.name !== 'serviceWorker',
      minSize: 50000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
