// lists.test.js
'use strict';
import { fromJS } from 'immutable';
import lists, { defaultState } from '../lists.js';
import {
  ADD_LIST_ITEMS,
  LOGOUT,
  REMOVE_LIST_ITEMS,
  SET_LIST_ITEMS,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../../ActionTypes.js';

const selectPath = ['randomPath1', 'randomPath2'];
const itemIds = ['randomId1', 'randomId2'];

describe('reducer lists', () => {
  it('should return the default state', () => {
    expect(lists(undefined, {})).toEqual(defaultState);
  });
  it(`should handle ${ADD_LIST_ITEMS}`, () => {
    const samplePayload = { selectPath, itemIds };
    const newState = lists(defaultState, {
      type: ADD_LIST_ITEMS,
      payload: samplePayload,
    });
    expect(newState.getIn([...selectPath, 'itemIds']).toJS()).toEqual(itemIds);
  });
  it(`should handle ${LOGOUT}`, () => {
    const stateWithList = lists(defaultState, {
      type: ADD_LIST_ITEMS,
      payload: { selectPath, itemIds },
    });
    const newState = lists(defaultState, { type: LOGOUT });
    expect(stateWithList.getIn([...selectPath, 'itemIds']).toJS()).toEqual(
      itemIds
    );
    expect(newState.toJS()).toEqual(defaultState.toJS());
  });
  it(`should handle ${REMOVE_LIST_ITEMS}`, () => {
    const samplePayload = { selectPath, itemIds: ['randomId1'] };
    const newState = lists(
      fromJS({ randomPath1: { randomPath2: { itemIds } } }),
      {
        type: REMOVE_LIST_ITEMS,
        payload: samplePayload,
      }
    );
    expect(newState.getIn([...selectPath, 'itemIds']).toJS()).toEqual(
      itemIds.slice(1)
    );
  });
  it(`should handle ${SET_LIST_ITEMS}`, () => {
    const samplePayload = { selectPath, itemIds };
    const newState = lists(defaultState, {
      type: SET_LIST_ITEMS,
      payload: samplePayload,
    });
    expect(newState.getIn([...selectPath, 'itemIds']).toJS()).toEqual(itemIds);
  });
  // -- PLOP_PREPEND_REDUCER_ACTION_TEST --
});
