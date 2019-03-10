// serviceWorkerRegister.js
'use strict';

const isProd = 'production' === process.env.NODE_ENV;
const serviceWorkerFilename =
  process.env.SERVICE_WORKER_FILENAME || 'service-worker.js';

export const serviceWorkerRegister = `
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/${serviceWorkerFilename}')
      ${
        isProd
          ? ''
          : '.then(register => console.log("Service worker setup.", register))'
      }
      ${
        isProd
          ? '.catch(() => null);'
          : '.catch(error => console.log("Service worker register error.", error));'
      }
  }
`;

export default serviceWorkerRegister;
