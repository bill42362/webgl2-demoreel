// getNetworkingData.js
'use strict';
import { isCollection } from 'immutable';
import createCachedSelector from 're-reselect';

/**
 * Select networking data by select path
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {array} selectPath - select path.
 * @param {string} dataKey - data key.
 * @return {any} The selected networking data.
 */
const getNetworkingData = createCachedSelector(
  state => state.get('networkings'),
  (state, selectPath) => selectPath,
  (state, selectPath, dataKey) => dataKey,
  (networkings, selectPath, dataKey) => {
    let result = undefined;
    if (networkings) {
      result = networkings.getIn([...selectPath, dataKey]);
    }
    return isCollection(result) ? result.toJS() : result;
  }
)((state, selectPath, dataKey) => `${selectPath.join(':')}:${dataKey}`);

export default getNetworkingData;
