// debug.js
'use strict';
import Debug from 'debug';

const isProd = 'production' === process.env.NODE_ENV;
if (!isProd && !window.enableDebug) {
  window.enableDebug = debugString => {
    const debugs = debugString.split(',');
    debugs.forEach(debug => Debug.enable(debug));
  };
}

export const actionError = Debug('action:error');
export const actionLog = Debug('action:log');
export const componentError = Debug('component:error');
export const bitmovinLog = Debug('bitmovin:log');
export const serviceWorkerLog = Debug('serviceWorker:log');

export default {
  actionError,
  actionLog,
  componentError,
  bitmovinLog,
  serviceWorkerLog,
};
