// i18n.js
'use strict';
import I18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// const isProd = 'production' === process.env.NODE_ENV;
const isOnClient = process && !process.release;

const i18nOption = {
  fallbackLng: 'en',
  interpolation: { prefix: '{', suffix: '}' },
  // debug: !isProd && isOnClient,
};

// eslint-disable-next-line no-unused-vars
const languageDetectorOption = {
  detection: {
    order: [
      'querystring',
      // 'cookie',
      // 'localStorage',
      'navigator',
      'htmlTag',
      'path',
      'subdomain',
    ],
  },
};

const xhrOption = {
  backend: {
    loadPath: '/locale/{lng}.json',
    crossDomain: true,
  },
};

const clientOption = { ...i18nOption, ...xhrOption };
const serverOption = { ...i18nOption };

export const i18n = isOnClient
  ? I18n.createInstance(clientOption)
      .use(XHR)
      .use(LanguageDetector)
  : I18n.createInstance(serverOption);

export default i18n;
