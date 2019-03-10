// requestHandler.js
import { ServerStyleSheet } from 'styled-components';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Helmet } from 'react-helmet';

import EnvConfig from '../../config.json';
import createInitialStore from '../client/js/createInitialStore.js';
import renderApp from './renderApp.js';
import renderHtml from './renderHtml.js';

const nodeEnv = process.env.NODE_ENV || EnvConfig.NODE_ENV || 'production';
const isProd = 'production' === nodeEnv;

export const requestHandler = ({ clientStats }) => {
  const { assets, children } = clientStats;
  const pwaManifestAsset = assets.filter(asset =>
    asset.name.match(/^manifest.*\.json$/gi)
  )[0];
  const pwaManifestTag = pwaManifestAsset
    ? `<link rel=manifest href=/${pwaManifestAsset.name}>`
    : '';

  const faviconPlugin = children.filter(child =>
    child.name.match('favicon')
  )[0];

  let faviconTags = '';
  if (faviconPlugin) {
    faviconTags = eval(faviconPlugin.modules[0].source)
      .html.join('')
      .replace('black-translucent', 'black');
  }

  const { js } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['vendors'],
    after: ['bundle'],
  });
  const jsTags = js.toString();

  return (request, response, next) => {
    createInitialStore(request)
      .then(({ store }) => {
        const context = {};
        const sheet = new ServerStyleSheet();
        clearChunks();
        const app = renderApp({ request, store, context, sheet });
        const helmet = Helmet.renderStatic();
        if (context.url) {
          response.writeHead(301, { Location: context.url });
          response.end();
        } else {
          const preloadedState = store.getState().toJS();
          const i18n = {
            initialLanguage: request.i18n.language,
            initialI18nStore: request.i18n.languages.reduce((current, l) => {
              return {
                ...current,
                [l]: request.i18n.services.resourceStore.data[l],
              };
            }, {}),
          };
          const styleTags = sheet.getStyleTags();
          renderHtml({
            request,
            helmet,
            faviconTags,
            pwaManifestTag,
            preloadedState,
            i18n,
            styleTags,
            app,
            jsTags,
          })
            .then(({ html }) => {
              response.send(html);
            })
            .catch(error => {
              console.log('renderHtml() error:', error);
              response.writeHead(301, { Location: '/404' });
              response.end();
            });
        }
      })
      .catch(error => {
        console.log(error);
        response.writeHead(301, { Location: '/404' });
        response.end();
      });
  };
};

export default requestHandler;
