// renderApp.js
'use strict';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from '../../src/client/js/component/App.jsx';

export const renderApp = ({ request, store, context, sheet }) =>
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={request.url} context={context}>
        <I18nextProvider i18n={request.i18n}>
          <App sheet={sheet} />
        </I18nextProvider>
      </StaticRouter>
    </Provider>
  );

export default renderApp;
