// index.js
'use strict';
import 'core-js/fn/array/flat-map';
import URLSearchParams from '@ungap/url-search-params';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import {
  ConnectedRouter,
  routerMiddleware,
} from 'connected-react-router/immutable';
import { replace } from 'connected-react-router';
import { fromJS } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import QueryString from 'query-string';
import ReactGA from 'react-ga';

import { loadState, throttleSaveState } from './resource/persist.js';
import messageHandler from './resource/messageHandler.js';
import { createRootReducer } from './reducer/reducer.js';
import createInitialStore from './createInitialStore.js';
import i18n from './resource/i18n.js';
import App from './component/App.jsx';
import ErrorBoundary from './component/ErrorBoundary.jsx';
import ErrorPage from './page/ErrorPage.jsx';
import { getIsOnIOS } from './resource/getUserAgent.js';

if (!window.URLSearchParams) {
  window.URLSearchParams = URLSearchParams;
}

const isProd = 'production' === process.env.NODE_ENV;
const FIVE_MINUTS = 5 * 60 * 1000;

ReactGA.initialize(
  [
    {
      trackingId: process.env.GOOGLE_ANALYTICS_ID,
      gaOptions: { name: 'default' },
    },
    {
      trackingId: process.env.GOOGLE_AD_WORD_ID,
      gaOptions: { name: 'AdWord' },
    },
  ],
  { debug: false }
);

const createApp = ({ preloadedState, render }) => {
  const history = createBrowserHistory();

  const composeEnhancer = isProd
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const isInPWA =
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && window.navigator.standalone);
  const isOnIOS = getIsOnIOS();

  let modifiedPreloadState = preloadedState;
  if (isOnIOS && isInPWA) {
    const expireTimestamp = preloadedState.get('expireTimestamp');
    const wasHidden = expireTimestamp > Date.now();
    if (!wasHidden) {
      modifiedPreloadState = modifiedPreloadState.delete('operations');
      modifiedPreloadState = modifiedPreloadState.delete('modals');
      modifiedPreloadState = modifiedPreloadState.delete('routeHistory');
    }
    modifiedPreloadState = modifiedPreloadState.delete('expireTimestamp');
  }

  const store = createStore(
    createRootReducer(history),
    modifiedPreloadState,
    composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
  );

  const getState = () => {
    const state = store.getState();
    let result = {};
    if (isOnIOS && isInPWA) {
      result = {
        ...result,
        // save to IndexedDB doesn't means will load on refresh.
        // depends on `expireTimestamp`.
        modals: state.get('modals').toJS(),
        operations: state.get('operations').toJS(),
        routeHistory: {
          stack: [
            state
              .getIn(['routeHistory', 'stack'])
              .filter(r => !/\/404/gi.test(r))
              .get(-1),
          ],
        },
        expireTimestamp: Date.now() + FIVE_MINUTS,
      };
    }
    return result;
  };
  store.subscribe(() => throttleSaveState({ getState }));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event =>
      messageHandler(store, event)
    );
  }

  if (isOnIOS && isInPWA) {
    const url = new URL(location.href);
    const oauth = url.searchParams.get('complete');
    const lastRoute = modifiedPreloadState.getIn(['routeHistory', 'stack', 0]);
    // don't override for oauth login.
    if (lastRoute && !oauth) {
      store.dispatch(replace(lastRoute));
    }
  }

  return i18n.init().then(
    () =>
      new Promise(resolve => {
        render(
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <I18nextProvider
                i18n={i18n}
                initialI18nStore={window.initialI18nStore}
                initialLanguage={window.initialLanguage}
              >
                <ErrorBoundary
                  onErrorResolved={() => store.dispatch(replace('/'))}
                  errorElement={<ErrorPage />}
                >
                  <App />
                </ErrorBoundary>
              </I18nextProvider>
            </ConnectedRouter>
          </Provider>,
          document.getElementById('app-root'),
          resolve
        );
      })
  );
};

const query = QueryString.parse(window.location.search);
if (process.env.SERVER_SIDE_RENDER) {
  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  loadState().then(storageState =>
    createApp({
      render: ReactDOM.hydrate,
      preloadedState: fromJS(storageState).mergeDeep(fromJS(preloadedState)),
    })
  );
} else {
  Promise.all([createInitialStore({ query }), loadState()]).then(
    ([{ store }, storageState]) => {
      const preloadedState = store.getState();
      return createApp({
        render: ReactDOM.render,
        preloadedState: fromJS(storageState).mergeDeep(fromJS(preloadedState)),
      });
    }
  );
}
