// networkings.js
'use strict';
import { fromJS } from 'immutable';
import {
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
  SET_NETWORKING_IDLE,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../ActionTypes.js';

export const getStateTemplate = () => ({
  isFetching: false,
  isFetched: false,
  error: null,
  fetchedTimestamp: null,
});

export const defaultState = fromJS({});

/**
 * Networkings.
 * @module reducer/networkings
 */
const networkings = (state = defaultState, action) => {
  switch (action.type) {
    case SET_NETWORKING_FETCHING:
      return _SET_NETWORKING_FETCHING(action.payload)(state);
    case SET_NETWORKING_SUCCESS:
      return _SET_NETWORKING_SUCCESS(action.payload)(state);
    case SET_NETWORKING_ERROR:
      return _SET_NETWORKING_ERROR(action.payload)(state);
    case SET_NETWORKING_IDLE:
      return _SET_NETWORKING_IDLE(action.payload)(state);
    // -- PLOP_PREPEND_REDUCER_SWITCH_CASE --
    default:
      return state;
  }
};

/**
 * Set networking fetching
 * @kind reducer/actionType
 * @name SET_NETWORKING_FETCHING
 * @param {array} {selectPath} - immutable select path.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_FETCHING = ({ selectPath }) => state => {
  return state.mergeDeepIn(
    selectPath,
    fromJS({
      ...getStateTemplate(),
      isFetching: true,
    })
  );
};

/**
 * Set networking success
 * @kind reducer/actionType
 * @name SET_NETWORKING_SUCCESS
 * @param {object} {selectPath} - immutable select path.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_SUCCESS = ({ selectPath }) => state => {
  return state.mergeDeepIn(
    selectPath,
    fromJS({
      isFetching: false,
      isFetched: true,
      error: null,
      fetchedTimestamp: Date.now(),
    })
  );
};

/**
 * Set networking error
 * @kind reducer/actionType
 * @name SET_NETWORKING_ERROR
 * @param {object} {selectPath} - immutable select path.
 * @param {Error} {error} - error.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_ERROR = ({ selectPath, error }) => state => {
  return state.mergeDeepIn(
    selectPath,
    fromJS({
      isFetching: false,
      isFetched: true,
      fetchedTimestamp: Date.now(),
      error,
    })
  );
};

/**
 * Set networking idle
 * @kind reducer/actionType
 * @name SET_NETWORKING_IDLE
 * @param {object} {selectPath} - immutable select path.
 * @return {Immutable.Map} New state
 */
const _SET_NETWORKING_IDLE = ({ selectPath }) => state => {
  return state.mergeDeepIn(selectPath, fromJS(getStateTemplate()));
};

export default networkings;
