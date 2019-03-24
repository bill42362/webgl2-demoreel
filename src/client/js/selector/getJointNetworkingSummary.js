// getJointNetworkingSummary.js
'use strict';
import createCachedSelector from 're-reselect';

import getNetworkingSummary from '../selector/getNetworkingSummary.js';

/**
 * Select joint networking summary by select paths
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {Array} selectPaths - array of select paths
 * @return {NetworkingSummary} The selected joint networking summary.
 */
const getJointNetworkingSummary = createCachedSelector(
  (state, selectPaths) => getNetworkingSummary(state, selectPaths[0]),
  (state, selectPaths) =>
    2 < selectPaths.length
      ? getJointNetworkingSummary(state, selectPaths.slice(1))
      : getNetworkingSummary(state, selectPaths[1]),
  (summaryA, summaryB) => {
    const error = summaryA.error || summaryB.error;
    let status = 'intermediate';
    const statuses = [summaryA.status, summaryB.status];
    if (statuses.includes('error')) {
      status = 'error';
    } else if (statuses.includes('fetching')) {
      status = 'fetching';
    } else if ('fetched' === summaryA.status && 'fetched' === summaryB.status) {
      status = 'fetched';
    } else if ('idle' === summaryA.status && 'idle' === summaryB.status) {
      status = 'idle';
    }
    return { status, error };
  }
)((state, selectPaths) => selectPaths.join(':'));

export default getJointNetworkingSummary;
