// routeHistory.test.js
'use strict';
import routeHistory, { defaultState } from '../routeHistory.js';
import {
  PUSH_ROUTE_HISTORY,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../../ActionTypes.js';

describe('reducer routeHistory', () => {
  it('should return the default state', () => {
    expect(routeHistory(undefined, {})).toEqual(defaultState);
  });
  it(`should handle ${PUSH_ROUTE_HISTORY}`, () => {
    const newState1 = routeHistory(defaultState, {
      type: PUSH_ROUTE_HISTORY,
      payload: 'fakeUrl1',
    });
    const newState2 = routeHistory(newState1, {
      type: PUSH_ROUTE_HISTORY,
      payload: 'fakeUrl2',
    });
    const expectResult = ['fakeUrl1', 'fakeUrl2'];
    expect(newState2.getIn(['stack']).toJS()).toEqual(expectResult);
  });
  it(`should skip ${PUSH_ROUTE_HISTORY} if last href is the same`, () => {
    const newState1 = routeHistory(defaultState, {
      type: PUSH_ROUTE_HISTORY,
      payload: 'fakeUrl1',
    });
    const newState2 = routeHistory(newState1, {
      type: PUSH_ROUTE_HISTORY,
      payload: 'fakeUrl1',
    });
    const expectResult = ['fakeUrl1'];
    expect(newState2.getIn(['stack']).toJS()).toEqual(expectResult);
  });
  // -- PLOP_PREPEND_REDUCER_ACTION_TEST --
});
