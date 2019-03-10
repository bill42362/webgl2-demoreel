// modals.test.js
'use strict';
import modals, { defaultState } from '../modals.js';
import {
  ADD_MODAL,
  ADD_MODAL_NEXT_ID,
  REMOVE_MODALS,
  SET_MODAL_STATUS,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../../ActionTypes.js';

describe('reducer modals', () => {
  it('should return the default state', () => {
    expect(modals(undefined, {})).toEqual(defaultState);
  });
  it(`should handle ${ADD_MODAL}`, () => {
    const samplePayload = {
      id: `${Math.random()}`,
      prevId: `${Math.random()}`,
    };
    const newState = modals(defaultState, {
      type: ADD_MODAL,
      payload: samplePayload,
    });
    expect(newState.getIn([samplePayload.id]).toJS().prevId).toEqual(
      samplePayload.prevId
    );
  });
  it(`should handle ${ADD_MODAL_NEXT_ID}`, () => {
    const samplePayload = {
      id: `${Math.random()}`,
      nextId: `${Math.random()}`,
    };
    const stateWithModal = modals(defaultState, {
      type: ADD_MODAL,
      payload: { id: samplePayload.id },
    });
    const newState = modals(stateWithModal, {
      type: ADD_MODAL_NEXT_ID,
      payload: samplePayload,
    });
    expect(newState.getIn([samplePayload.id, 'nextIds']).toJS()).toContain(
      samplePayload.nextId
    );
  });
  it(`should handle ${REMOVE_MODALS}`, () => {
    const sampleModal = { id: `${Math.random()}`, nextId: `${Math.random()}` };
    const stateWithModal = modals(defaultState, {
      type: ADD_MODAL,
      payload: { id: sampleModal.id },
    });
    const newState = modals(stateWithModal, {
      type: REMOVE_MODALS,
      payload: { ids: [sampleModal.id] },
    });
    expect(newState.get(sampleModal.id)).toEqual(undefined);
  });
  it(`should handle ${SET_MODAL_STATUS}`, () => {
    const sampleId = 'ranromId';
    const sampleStatus = 'ranromStatus';
    const samplePayload = { id: sampleId, status: sampleStatus };
    const newState = modals(defaultState, {
      type: SET_MODAL_STATUS,
      payload: samplePayload,
    });
    expect(newState.getIn([sampleId, 'status'])).toEqual(sampleStatus);
  });
  // -- PLOP_PREPEND_REDUCER_ACTION_TEST --
});
