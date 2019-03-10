// pushRouteHistory.js
'use strict';
import { PUSH_ROUTE_HISTORY } from '../ActionTypes.js';

/**
 * Push history
 * @kind action
 * @param {string} {href} - window location href
 * @return {Promise} Action promise.
 */
const pushRouteHistory = ({ href }) => async dispatch => {
  return dispatch({ type: PUSH_ROUTE_HISTORY, payload: href });
};

export default pushRouteHistory;
