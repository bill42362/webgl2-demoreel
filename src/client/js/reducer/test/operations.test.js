// operations.test.js
'use strict';
import { fromJS } from 'immutable';

import operations, { defaultState } from '../operations.js';
import {
  MERGE_OPERATION_DATA,
  REMOVE_OPERATION_DATA,
  SET_OPERATION_DATA,
  // -- PLOP_PREPEND_REDUCER_ACTION_TYPE --
} from '../../ActionTypes.js';

const sampleSelectPath = ['randomPath1', 'randomPath2'];
const sampleDataKey = 'randomKey';
const sampleDataValue = 'randomValue';
const sampleData = { [sampleDataKey]: sampleDataValue };

describe('reducer operations', () => {
  it('should return the default state', () => {
    expect(operations(undefined, {})).toEqual(defaultState);
  });
  it(`should handle ${MERGE_OPERATION_DATA}`, () => {
    const samplePayload = { selectPath: sampleSelectPath, data: sampleData };
    const newState = operations(defaultState, {
      type: MERGE_OPERATION_DATA,
      payload: samplePayload,
    });
    expect(newState.getIn([...sampleSelectPath, sampleDataKey])).toEqual(
      sampleDataValue
    );
  });
  it(`should handle ${REMOVE_OPERATION_DATA}`, () => {
    const samplePayload = { selectPath: sampleSelectPath };
    const newState = operations(defaultState, {
      type: REMOVE_OPERATION_DATA,
      payload: samplePayload,
    });
    expect(newState.getIn(sampleSelectPath)).toEqual(
      defaultState.getIn(sampleSelectPath) || fromJS({})
    );
  });
  it(`should handle ${SET_OPERATION_DATA}`, () => {
    const samplePayload = { selectPath: sampleSelectPath, data: sampleData };
    const newState = operations(defaultState, {
      type: SET_OPERATION_DATA,
      payload: samplePayload,
    });
    expect(newState.getIn([...sampleSelectPath], sampleDataKey).toJS()).toEqual(
      sampleData
    );
  });
  // -- PLOP_PREPEND_REDUCER_ACTION_TEST --
});
