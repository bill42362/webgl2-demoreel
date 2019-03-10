// getNetworkingSummary.js
'use strict';
import createCachedSelector from 're-reselect';

/**
 * Select networking summary by select path
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {array} selectPath - select path.
 * @return {string} The selected networking summary.
 */
const getNetworkingSummary = createCachedSelector(
  (state, selectPath) => state.getIn(['networkings', ...selectPath]),
  networking => {
    if (!networking) {
      return 'idle';
    }
    const data = networking.toJS();
    if (null !== data.error) {
      return 'error';
    } else if (data.isFetching) {
      return 'fetching';
    } else if (data.isFetched) {
      return 'fetched';
    } else {
      return 'idle';
    }
  }
)((state, selectPath) => selectPath.join(':'));

export default getNetworkingSummary;
