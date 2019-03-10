// getRouterData.js
'use strict';
import { isCollection } from 'immutable';
import createCachedSelector from 're-reselect';

/**
 * Select router data by data key
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {string|Array} dataKey - select key.
 * @return {any} The selected router data.
 */
const getRouterData = createCachedSelector(
  state => state,
  (state, dataKey) =>
    Array.isArray(dataKey)
      ? dataKey
      : dataKey.replace(/^\.|\.$/g, '').split('.'),
  (state, joinKey) => {
    const result = state.getIn(['router', ...joinKey]);
    return isCollection(result) ? result.toJS() : result;
  }
)((state, dataKey) => (Array.isArray(dataKey) ? dataKey.join('.') : dataKey));

export default getRouterData;
