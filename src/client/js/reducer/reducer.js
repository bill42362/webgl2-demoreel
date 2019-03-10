// reducer.js
'use strict';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import modals from './modals.js';
import networkings from './networkings.js';
import lists from './lists.js';
import operations from './operations.js';
import routeHistory from './routeHistory.js';
// -- PLOP_PREPEND_REDUCER_IMPORT --

const reducers = {
  modals,
  networkings,
  lists,
  operations,
  routeHistory,
  // -- PLOP_PREPEND_REDUCER --
};

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export default combineReducers(reducers);
