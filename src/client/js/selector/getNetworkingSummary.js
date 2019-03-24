// getNetworkingSummary.js
'use strict';
import createCachedSelector from 're-reselect';

/**
 * @typedef {Object} NetworkingSummary
 * @property {string} status networking status
 * @property {Error} error networking error if there is
 * @global
 */

/**
 * Select networking summary by select path
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {array} selectPath - select path.
 * @return {NetworkingSummary} The selected networking summary.
 */
const getNetworkingSummary = createCachedSelector(
  (state, selectPath) => state.getIn(['networkings', ...selectPath]),
  networking => {
    if (!networking) {
      return { status: 'idle', error: null };
    }
    const data = networking.toJS();
    if (null !== data.error) {
      return { status: 'error', error: data.error };
    } else if (data.isFetching) {
      return { status: 'fetching', error: null };
    } else if (data.isFetched) {
      return { status: 'fetched', error: null };
    } else {
      return { status: 'idle', error: null };
    }
  }
)((state, selectPath) => selectPath.join(':'));

export default getNetworkingSummary;
