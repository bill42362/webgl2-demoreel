// facebookSDK.js
'use strict';

export const facebookSDK = `
  window.fbAsyncInit = function() {
    FB.init({
      appId: ${process.env.FACEBOOK_APP_ID},
      cookie: true,
      version: 'v3.1'
    });
    FB.AppEvents.logPageView();
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
`;

export default facebookSDK;
