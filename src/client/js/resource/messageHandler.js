// messageHandler.js
'use strict';
import {} from '../PusherEvents.js';

/**
 * The message handler to listen the event from the service worker
 * @module messageHandler
 */
const messageHandler = (store, event) => {
  const { type, payload } = event.data;
  switch (type) {
    default:
      return payload;
  }
};

export default messageHandler;
