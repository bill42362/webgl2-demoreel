// getUserAgent.js
'use strict';
import UAParser from 'ua-parser-js';

let parser = undefined;
let userAgent = undefined;
let isOnIOS = undefined;
let isOnApple = undefined;
let isOnMobile = undefined;
let browserVersion = undefined;
let isIosSafari = undefined;
let isIosChrome = undefined;
let isIosSafari10 = undefined;
let isOnDesktopSafari = undefined;
let isRecordAllowed = undefined;

export const getUserAgent = () => {
  if (!parser) {
    parser = new UAParser();
  }
  if (!userAgent) {
    userAgent = parser.getResult();
  }
  return userAgent;
};

export const getIsOnApple = () => {
  if (undefined === isOnApple) {
    isOnApple = ['iOS', 'Mac OS'].includes(getUserAgent().os.name);
  }
  return isOnApple;
};

export const getIsOnIOS = () => {
  if (undefined === isOnIOS) {
    isOnIOS = ['iOS'].includes(getUserAgent().os.name);
  }
  return isOnIOS;
};

export const getIsOnMobile = () => {
  if (undefined === isOnMobile) {
    isOnMobile = !!getUserAgent().device.type;
  }
  return isOnMobile;
};

export const getXUserAgent = () => {
  return `swag/2.31.0 (${getIsOnApple() ? 'iPhone' : 'Android'}; ${
    getUserAgent().os.name
  })`;
};

export const getIsIosSafari10 = () => {
  if (undefined === isIosSafari10) {
    if (!getIsOnIOS()) {
      isIosSafari10 = false;
    } else {
      if (undefined === browserVersion) {
        browserVersion = parseInt(
          getUserAgent().browser.version.split('.')[0],
          10
        );
      }
      if (10 !== browserVersion) {
        isIosSafari10 = false;
      } else {
        isIosSafari10 = true;
      }
    }
  }
  return isIosSafari10;
};

export const getIsIosSafari = () => {
  if (!getIsOnIOS()) {
    isIosSafari = false;
  } else {
    const { browser } = getUserAgent();
    const { name } = browser;
    if (name === 'Mobile Safari') {
      isIosSafari = true;
    } else {
      isIosSafari = false;
    }
  }
  return isIosSafari;
};

export const getIsIosChrome = () => {
  if (!getIsOnIOS()) {
    isIosChrome = false;
  } else {
    if (/chrome/gi.test(getUserAgent()?.browser?.name)) {
      isIosChrome = true;
    } else {
      isIosChrome = false;
    }
  }
  return isIosChrome;
};

export const getIsOnDesktopSafari = () => {
  if (undefined === isOnDesktopSafari) {
    isOnDesktopSafari = 'Safari' === getUserAgent().browser.name;
  }
  return isOnDesktopSafari;
};

export const getIsRecordAllowed = () => {
  if (undefined !== isRecordAllowed) {
    return isRecordAllowed;
  }
  if (false === getIsOnMobile()) {
    isRecordAllowed = false;
    return isRecordAllowed;
  }
  if (true === getIsOnIOS()) {
    isRecordAllowed = true;
    return isRecordAllowed;
  }
  const {
    browser: { name },
  } = getUserAgent();
  if (/(samsung|edge|UCBrowser|chrome)/gi.test(name)) {
    isRecordAllowed = true;
    return isRecordAllowed;
  }
  isRecordAllowed = false;
  return isRecordAllowed;
};

export default getUserAgent;
