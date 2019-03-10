// removeModals.js
'use strict';
import { List } from 'immutable';

import Delay from '../resource/Delay.js';
import { REMOVE_MODALS, SET_MODAL_STATUS } from '../ActionTypes.js';

const delay = new Delay(600);

const getNextIds = (modals, id) => {
  const nextIds = modals.getIn([id, 'nextIds']);
  if (!nextIds || 0 === nextIds.size) {
    return List([id]);
  } else {
    return nextIds
      .concat(nextIds.flatMap(id => getNextIds(modals, id)))
      .insert(0, id)
      .toSet();
  }
};

/**
 * Remove modals
 * @kind action
 * @param {array} {ids} - modal ids.
 * @param {string} [{transitionStatus}] - transition status.
 * @return {Promise} Action promise.
 */
const removeModals = ({ ids, transitionStatus }) => async (
  dispatch,
  getState
) => {
  const modals = getState().get('modals');
  const allIds = ids.flatMap(id => getNextIds(modals, id).toJS());
  if (transitionStatus) {
    await Promise.all([
      ...allIds.map(id =>
        dispatch({
          type: SET_MODAL_STATUS,
          payload: { status: transitionStatus, id },
        })
      ),
      delay.promise(),
    ]);
  }
  return dispatch({ type: REMOVE_MODALS, payload: { ids: allIds } });
};

export default removeModals;
