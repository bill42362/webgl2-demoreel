// networkings.test.js
'use strict';
import networkings, { defaultState, getStateTemplate } from '../networkings.js';
import {
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
  SET_NETWORKING_IDLE,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../../ActionTypes.js';

const selectPath = ['randomPath1', 'randomPath2'];

describe('reducer networkings', () => {
  it('should return the default state', () => {
    expect(networkings(undefined, {})).toEqual(defaultState);
  });
  it(`should handle ${SET_NETWORKING_FETCHING}`, () => {
    const samplePayload = { selectPath };
    const newState = networkings(defaultState, {
      type: SET_NETWORKING_FETCHING,
      payload: samplePayload,
    });
    const newNetworking = newState.getIn(selectPath).toJS();
    expect(newNetworking).toEqual({ ...getStateTemplate(), isFetching: true });
  });
  it(`should handle ${SET_NETWORKING_SUCCESS}`, () => {
    const samplePayload = { selectPath };
    const newState = networkings(defaultState, {
      type: SET_NETWORKING_SUCCESS,
      payload: samplePayload,
    });
    const newNetworking = newState.getIn(selectPath).toJS();
    expect(newState.getIn(selectPath).toJS()).toMatchObject({
      isFetching: false,
      isFetched: true,
      error: null,
    });
  });
  it(`should handle ${SET_NETWORKING_ERROR}`, () => {
    const samplePayload = { selectPath, error: new Error() };
    const newState = networkings(defaultState, {
      type: SET_NETWORKING_ERROR,
      payload: samplePayload,
    });
    const newNetworking = newState.getIn(selectPath).toJS();
    expect(newNetworking).toMatchObject({
      isFetching: false,
      isFetched: true,
      error: samplePayload.error,
    });
  });
  it(`should handle ${SET_NETWORKING_IDLE}`, () => {
    const samplePayload = { selectPath };
    const newState = networkings(defaultState, {
      type: SET_NETWORKING_IDLE,
      payload: samplePayload,
    });
    expect(newState.getIn([...samplePayload.selectPath]).toJS()).toEqual(
      getStateTemplate()
    );
  });
  // -- PLOP_PREPEND_REDUCER_ACTION_TEST --
});
