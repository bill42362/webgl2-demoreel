// addModal.js
'use strict';
import {
  ADD_MODAL,
  ADD_MODAL_NEXT_ID,
  SET_MODAL_STATUS,
} from '../ActionTypes.js';
import { modalTemplate } from '../reducer/modals.js';

/**
 * Add modal
 * @kind action
 * @param {string} {id} - action param.
 * @param {string} [{prevId}] - previous modal id.
 * @param {array} [{higherThanIds}=[]] - model ids which this modal should higher than.
 * @param {array} [{lowerThanIds}=[]] - model ids which this modal should lower than.
 * @param {bool} [{isHigherThanAll}] - should modal higher than all existing modals.
 * @param {string} [{transitionStatus}] - transition status.
 * @return {Promise} Action promise.
 */
const addModal = ({
  id,
  prevId,
  higherThanIds = [],
  lowerThanIds = [],
  isHigherThanAll,
  transitionStatus,
}) => async (dispatch, getState) => {
  const modals = getState().get('modals');

  let shouldComputeHigher = true;
  if (!(higherThanIds.length || isHigherThanAll) && lowerThanIds.length) {
    shouldComputeHigher = false;
  }

  const referenceIds = shouldComputeHigher
    ? [
        ...new Set(
          [
            prevId,
            ...higherThanIds,
            ...(isHigherThanAll ? [...modals.keys()] : []),
          ].filter(id => id)
        ),
      ]
    : [...new Set([prevId, ...lowerThanIds].filter(id => id))];

  const referenceZIndexes = modals
    .filter(modal => referenceIds.includes(modal.get('id')))
    .map(modal => modal.get('zIndex'))
    .toArray();

  const zIndex = shouldComputeHigher
    ? Math.max(...referenceZIndexes, 99) + 1
    : Math.min(...referenceZIndexes) - 1;

  const prevModal = modals.get(prevId);
  if (prevModal) {
    dispatch({ type: ADD_MODAL_NEXT_ID, payload: { id: prevId, nextId: id } });
  }

  const modalData = {
    ...modalTemplate,
    higherThanIds: shouldComputeHigher ? referenceIds : [],
    id,
    zIndex,
    lowerThanIds,
  };

  if (transitionStatus) {
    setTimeout(
      () =>
        dispatch({
          type: SET_MODAL_STATUS,
          payload: { status: modalTemplate.status, id },
        }),
      600
    );
    modalData.status = transitionStatus;
  }

  return dispatch({ type: ADD_MODAL, payload: modalData });
};

export default addModal;
