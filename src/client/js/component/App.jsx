// App.jsx
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import styled, {
  createGlobalStyle,
  StyleSheetManager,
} from 'styled-components';
import styledNormalize from 'styled-normalize';
import { Helmet } from 'react-helmet';
import universal from 'react-universal-component';

import serviceWorkerRegister from '../resource/serviceWorkerRegister.js';
import media from '../style/media.js';

import PageviewTracker from '../container/PageviewTracker.js';

import ChunkLoading from '../component/ChunkLoading.jsx';
import GeneralErrorToastr from '../component/GeneralErrorToastr.jsx';
const universalConfig = {
  loading: <ChunkLoading />,
  error: <GeneralErrorToastr />,
};
const UniversalContainer = universal(
  ({ filename }) => import(`../container/${filename}.js`),
  universalConfig
);

const ErrorPage = universal(import('../page/ErrorPage.jsx'), universalConfig);

const GlobalStyle = createGlobalStyle`
  ${styledNormalize};
  *, ::after, ::before { box-sizing: border-box; }
  body {
    background-color: #191919;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-tap-highlight-color: transparent;
  }
  a { color: inherit; text-decoration: none; }
  a > * { opacity: inherit; }
  a:hover {
    opacity: .7;

    ${media.mobile`
      opacity: 1;
    `};
  }

  ${media.tablet`
    html { touch-action: manipulation; }
  `};
`;

const websiteDescription = 'WebGL2 Demoreel';

const App = () => {
  return (
    <StyledApp>
      <Helmet
        defaultTitle="WebGL2 Demoreel"
        titleTemplate="%s - WebGL2 Demoreel"
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="author" content="Pi-Yin Hsiao" />
        <meta name="description" content={websiteDescription} />

        <meta property="og:url" content="https://github.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WebGL2 Demoreel" />
        <meta property="og:description" content={websiteDescription} />
        <meta property="og:site_name" content="WebGL2 Demoreel" />
      </Helmet>
      <GlobalStyle />
      <Route
        render={() => (
          <Helmet>
            <script>{serviceWorkerRegister}</script>
          </Helmet>
        )}
      />
      <UniversalContainer filename="HistoryModifier" />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PageviewTracker title="Home">
              <UniversalContainer filename="Home" />
            </PageviewTracker>
          )}
        />
        <Route path="/404" render={() => <ErrorPage />} />
        <Redirect to="/404" />
      </Switch>
    </StyledApp>
  );
};

App.propTypes = {};

const StyledApp = styled.div`
  color: #fff;
  font-weight: 200;
`;

const StyledBody = ({ sheet }) => {
  if (sheet) {
    return (
      <StyleSheetManager sheet={sheet.instance}>
        <App />
      </StyleSheetManager>
    );
  } else {
    return <App />;
  }
};

StyledBody.propTypes = {
  ...App.propTypes,
  sheet: PropTypes.object,
};

export default hot(module)(StyledBody);
