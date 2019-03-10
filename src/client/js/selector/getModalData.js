// getModalData.js
'use strict';
import { isCollection } from 'immutable';
import createCachedSelector from 're-reselect';

/**
 * Select modal data by id
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {string} id - modal id.
 * @param {string} dataKey - data key.
 * @return {any} The selected modal data.
 */
const getModalData = createCachedSelector(
  state => state.get('modals'),
  (state, id) => id,
  (state, id, dataKey) => dataKey,
  (modals, id, dataKey) => {
    const result = modals.getIn([id, dataKey]);
    return isCollection(result) ? result.toJS() : result;
  }
)((state, id, dataKey) => `${id}:${dataKey}`);

export default getModalData;
