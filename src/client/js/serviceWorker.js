// serviceWorker.js
'use strict';

/**
 * The message handler to listen the message event from the web client.
 * @module messageReducer
 */
const messageReducer = event => {
  const { type } = event.data;
  switch (type) {
    default:
      return;
  }
};

// eslint-disable-next-line no-unused-vars
const sendMessage = async (message, clientId) => {
  const client = await self.clients.get(clientId);
  const clients = client ? [client] : await self.clients.matchAll();

  clients.forEach(client => {
    client.postMessage(message);
  });
};

self.addEventListener('message', messageReducer);
