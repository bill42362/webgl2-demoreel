// routeHistory.js
'use strict';
import { fromJS } from 'immutable';
import {
  PUSH_ROUTE_HISTORY,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../ActionTypes.js';

export const defaultState = fromJS({
  stack: [],
});

/**
 * Route history.
 * @module reducer/routeHistory
 */
const routeHistory = (state = defaultState, action) => {
  switch (action.type) {
    case PUSH_ROUTE_HISTORY:
      return _PUSH_ROUTE_HISTORY(action.payload)(state);
    // -- PLOP_PREPEND_REDUCER_SWITCH_CASE --
    default:
      return state;
  }
};

/**
 * Push history
 * @kind reducer/actionType
 * @name PUSH_ROUTE_HISTORY
 * @param {string} {href} - window location href
 * @return {Immutable.Map} New state
 */
const _PUSH_ROUTE_HISTORY = href => state => {
  let stack = state.getIn(['stack']);
  if (stack.get(-1) !== href) {
    stack = state.getIn(['stack']).push(href);
  }
  return state.setIn(['stack'], stack);
};

// -- PLOP_PREPEND_REDUCER_ACTION_HANDLER --

export default routeHistory;
