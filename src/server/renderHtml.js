// renderHtml.js
import serialize from 'serialize-javascript';

const websiteDescription = 'Demo of WebGL2.';

const defaultHelmet = {
  htmlAttributes: '',
  meta: `
    <meta data-react-helmet="true" charset="utf-8"/>
    <meta data-react-helmet="true" name="viewport" content="width=device-width, initial-scale=1"/>
    <meta data-react-helmet="true" name="author" content="WebGL2"/>
    <meta data-react-helmet="true" name="description" content="${websiteDescription}"/>
    <meta data-react-helmet="true" property="og:url" content="https://github.com/bill42362"/>
    <meta data-react-helmet="true" property="og:type" content="website"/>
    <meta data-react-helmet="true" property="og:title" content="WebGL2"/>
    <meta data-react-helmet="true" property="og:description" content="${websiteDescription}"/>
    <meta data-react-helmet="true" property="og:site_name" content="WebGL2"/>
  `,
  title: '<title data-react-helmet="true">WebGL2</title>',
  link: '',
  script: '',
};

// https://stackoverflow.com/a/52959307
const legacyPwaSupport = tag => `
  ${tag}
  ${tag.replace(/rel=manifest/, 'rel=pwa-setup')}
  <script>
  if (!!navigator.platform && /iP(?:hone|ad|od)/.test(navigator.platform)) {
    document.querySelector('link[rel="manifest"]').setAttribute('rel', 'no-ios');
    //document.title = 'AppName'; // default app name | simulate short_name
    if ('standalone' in window.navigator && window.navigator.standalone && sessionStorage.getItem('iOS-redirect') === null) {
      sessionStorage.setItem('iOS-redirect', '');
      window.location = '/'; // simulate start_url
    }
  }
  </script>
`;

export const renderHtml = ({
  request,
  helmet = defaultHelmet,
  faviconTags,
  pwaManifestTag,
  preloadedState,
  i18n,
  styleTags,
  app,
  jsTags,
}) => {
  return new Promise(resolve => {
    resolve({
      html: `
        <!doctype html>
        <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.meta.toString()}
          ${
            !!faviconTags
              ? `
                <meta
                  data-react-helmet="true"
                  property="og:image"
                  content="${faviconTags.replace(
                    /^.*href="(\S*1536\S*)".*$/,
                    '$1'
                  )}"
                />
                <meta data-react-helmet="true" property="og:image:width" content="1536" />
                <meta data-react-helmet="true" property="og:image:height" content="2008" />
              `
              : ''
          }
          ${helmet.title.toString()}
          ${helmet.link.toString()}
          ${helmet.script.toString()}
          ${faviconTags || ''}
          ${pwaManifestTag ? legacyPwaSupport(pwaManifestTag) : ''}
          ${styleTags || ''}
          ${
            !!i18n
              ? `
                <script type="text/javascript">
                  window.initialI18nStore = ${serialize(i18n.initialI18nStore)};
                  window.initialLanguage = '${i18n.initialLanguage}';
                </script>
              `
              : ''
          }
          ${
            !!preloadedState
              ? `
                <script type="text/javascript">
                  window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
                </script>
              `
              : ''
          }
        </head>
        <body>
          <div id="app-root">${app || ''}</div>
          <div id="modal-root"></div>
          ${jsTags}
        </body>
        </html>
      `,
    });
  });
};

export default renderHtml;
