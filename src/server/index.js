// index.js
import Express from 'express';
import Helmet from 'helmet';
import Backend from 'i18next-node-fs-backend';

import EnvConfig from '../../config.json';
import i18n from '../client/js/resource/i18n.js';
import requestHandler from './requestHandler.js';
import renderHtml from './renderHtml.js';

const i18nextMiddleware = require('i18next-express-middleware');
const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'production';
const isProd = 'production' === nodeEnv;
const PORT = process.env.PORT || 3000;

const server = new Express();
server.use(Helmet());

const i18nextOption = {
  preload: ['en', 'zh-TW', 'zh-CN', 'ja'],
  backend: {
    loadPath: `${__dirname}/../client/locale/{lng}.json`,
  },
};

if (isProd) {
  server.use('/img', Express.static(`${__dirname}/../client/img`));
  server.use('/js', Express.static(`${__dirname}/../client/js`));
  if (EnvConfig.SERVER_SIDE_RENDER) {
    const clientStats = require('../../dist/client/stats.json');
    i18n
      .use(Backend)
      .use(i18nextMiddleware.LanguageDetector)
      .init(i18nextOption, () => {
        server.use(i18nextMiddleware.handle(i18n));
        server.get('/*', requestHandler({ clientStats }));
      });
  } else {
    // this `__dirname` will be `/dist`.
    server.use(
      '/facebookLogin.html',
      Express.static(`${__dirname}/../client/html/facebookLogin.html`)
    );
    server.use('/*', Express.static(`${__dirname}/../client/html/index.html`));
  }
  server.listen(PORT, () => {
    console.log(`Server is listening ${PORT} port.`);
  });
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const {
    default: clientConfig,
    hmrConfig,
  } = require('../../webpack/client.babel.js');

  const devOptions = {
    logLevel: hmrConfig.logLevel,
    publicPath: clientConfig.output.publicPath,
  };
  const hotOptions = {
    log: hmrConfig.log,
    path: hmrConfig.path,
    heartbeat: hmrConfig.heartbeat,
  };

  server.use('/locale', Express.static(`${__dirname}/../client/locale`));

  if (EnvConfig.SERVER_SIDE_RENDER) {
    const { default: renderConfig } = require('../../webpack/render.babel.js');
    const compiler = webpack([clientConfig, renderConfig]);

    i18n
      .use(Backend)
      .use(i18nextMiddleware.LanguageDetector)
      .init(i18nextOption, () => {
        server.use(i18nextMiddleware.handle(i18n));
        server.use(webpackDevMiddleware(compiler, devOptions));
        server.use(webpackHotMiddleware(compiler.compilers[0], hotOptions));
        server.use(webpackHotServerMiddleware(compiler));
      });

    server.listen(PORT, () => {
      console.log(`Server is listening ${PORT} port.`);
    });
  } else {
    const compiler = webpack(clientConfig);
    server.use(webpackDevMiddleware(compiler, devOptions));
    server.use(webpackHotMiddleware(compiler, hotOptions));

    const jsTags = '<script type=text/javascript src=/js/bundle.js></script>';
    renderHtml({ jsTags })
      .then(({ html }) => {
        server.get('/*', (request, response) => {
          response.send(html);
        });
        server.listen(PORT, () => {
          console.log(`Server is listening ${PORT} port.`);
        });
      })
      .catch(error => {
        console.log('renderHtml() error:', error);
      });
  }
}
