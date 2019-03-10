// trackEvent.js
'use strict';
import ReactGA from 'react-ga';

export const PAGEVIEW = 'PAGEVIEW';
export const MODALVIEW = 'MODALVIEW';

/**
 * Send event to event trackers.
 * @module trackEvent
 */
export const trackEvent = ({ type, payload }) => {
  switch (type) {
    case PAGEVIEW:
      return _PAGEVIEW(payload);
    case MODALVIEW:
      return _MODALVIEW(payload);
    default:
      return;
  }
};

/**
 * Handle PAGEVIEW event.
 * @kind trackEvent/eventType
 * @name PAGEVIEW
 * @param {string} {route} - route (pathname + search)
 * @param {string} {previousRoute} - previous route (pathname + search)
 * @param {string} {title} - event title
 */
const _PAGEVIEW = ({ route, title }) => {
  ReactGA.pageview(route, ['default'], title);
};

/**
 * Handle MODALVIEW event.
 * @kind trackEvent/eventType
 * @name MODALVIEW
 * @param {string} {route} - route (pathname)
 */
const _MODALVIEW = ({ route }) => {
  ReactGA.modalview(route, ['default']);
};

export default trackEvent;
