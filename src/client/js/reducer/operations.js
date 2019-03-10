// operations.js
'use strict';
import { fromJS } from 'immutable';
import {
  MERGE_OPERATION_DATA,
  REMOVE_OPERATION_DATA,
  SET_OPERATION_DATA,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../ActionTypes.js';

const now = new Date();
const todayUnix =
  new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;

const AndroidDownloadVersion = process.env.ANDROID_DOWNLOAD_VERSION;
const AndroidUrl = `https://swag.live/downloads/com-machipopo-swag-${AndroidDownloadVersion}.apk`;

export const defaultState = fromJS({
  forum: {
    mediaOrder: 0,
  },
  login: {
    phoneCountryCode: 'TW',
  },
  register: {
    username: '',
    preferences: ['gender:female'],
    birthdateUnix: todayUnix,
  },
  journal: {
    category: 'all',
  },
  message: {
    menu: {},
  },
  locationOptions: {
    all: [],
    select: [],
  },
  mobileAppDownloader: {
    linkData: [
      {
        type: 'Android',
        url: AndroidUrl,
      },
    ],
  },
});

/**
 * Operations.
 * @module reducer/operations
 */
const operations = (state = defaultState, action) => {
  switch (action.type) {
    case MERGE_OPERATION_DATA:
      return _MERGE_OPERATION_DATA(action.payload)(state);
    case REMOVE_OPERATION_DATA:
      return _REMOVE_OPERATION_DATA(action.payload)(state);
    case SET_OPERATION_DATA:
      return _SET_OPERATION_DATA(action.payload)(state);
    // -- PLOP_PREPEND_REDUCER_SWITCH_CASE --
    default:
      return state;
  }
};

/**
 * Merge operation data
 * @kind reducer/actionType
 * @name MERGE_OPERATION_DATA
 * @param {array} {selectPath} - operation data select path
 * @param {any} {data} - operation data
 * @return {Immutable.Map} New state
 */
const _MERGE_OPERATION_DATA = ({ selectPath, data }) => state => {
  return state.mergeDeepIn(selectPath, fromJS(data));
};

/**
 * Remove operation data
 * @kind reducer/actionType
 * @name REMOVE_OPERATION_DATA
 * @param {array} {selectPath} - operation data select path
 * @return {Immutable.Map} New state
 */
const _REMOVE_OPERATION_DATA = ({ selectPath }) => state => {
  return state.setIn(selectPath, defaultState.getIn(selectPath) || fromJS({}));
};

/**
 * Update operation data
 * @kind reducer/actionType
 * @name SET_OPERATION_DATA
 * @param {array} selectPath - operation data select path
 * @param {any} data - operation data
 * @return {Immutable.Map} New state
 */
const _SET_OPERATION_DATA = ({ selectPath, data }) => state => {
  return state.setIn([...selectPath], fromJS(data));
};

// -- PLOP_PREPEND_REDUCER_ACTION_HANDLER --

export default operations;
