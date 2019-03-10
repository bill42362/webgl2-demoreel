// modals.js
'use strict';
import { fromJS } from 'immutable';
import {
  ADD_MODAL,
  ADD_MODAL_NEXT_ID,
  REMOVE_MODALS,
  SET_MODAL_STATUS,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../ActionTypes.js';

export const modalTemplate = {
  id: '',
  prevId: '',
  nextIds: [],
  higherThanIds: [],
  zIndex: 0,
  status: 'display',
};

export const defaultState = fromJS({});

/**
 * State of modal views, includes z-index, dependences.
 * @module reducer/modals
 */
const modals = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MODAL:
      return _ADD_MODAL(action.payload)(state);
    case ADD_MODAL_NEXT_ID:
      return _ADD_MODAL_NEXT_ID(action.payload)(state);
    case REMOVE_MODALS:
      return _REMOVE_MODALS(action.payload)(state);
    case SET_MODAL_STATUS:
      return _SET_MODAL_STATUS(action.payload)(state);
    // -- PLOP_PREPEND_REDUCER_SWITCH_CASE --
    default:
      return state;
  }
};

/**
 * Add modal
 * @kind reducer/actionType
 * @name ADD_MODAL
 * @param {object} modal - modal
 * @return {Immutable.Map} New state
 */
const _ADD_MODAL = modal => state => {
  return state.mergeDeep({
    [modal.id]: fromJS({ ...modalTemplate, ...modal }),
  });
};

/**
 * Add modal next id.
 * @kind reducer/actionType
 * @name ADD_MODAL_NEXT_ID
 * @param {string} {id} - modal id
 * @param {string} {nextId} - next modal id
 * @return {Immutable.Map} New state
 */
const _ADD_MODAL_NEXT_ID = ({ id, nextId }) => state => {
  return state.updateIn([id, 'nextIds'], nextIds => nextIds.push(nextId));
};

/**
 * Remove modals
 * @kind reducer/actionType
 * @name REMOVE_MODALS
 * @param {array} {ids} - modal ids
 * @return {Immutable.Map} New state
 */
const _REMOVE_MODALS = ({ ids }) => state => {
  return state.filter(modal => !ids.includes(modal.get('id')));
};

/**
 * Set modal status
 * @kind reducer/actionType
 * @name SET_MODAL_STATUS
 * @param {string} {id} - modal id
 * @param {string} {status} - modal status
 * @return {Immutable.Map} New state
 */
const _SET_MODAL_STATUS = ({ id, status }) => state => {
  return state.setIn([id, 'status'], status);
};

// -- PLOP_PREPEND_REDUCER_ACTION_HANDLER --

export default modals;
