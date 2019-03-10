// getOperationData.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { MERGE_OPERATION_DATA } from '../../ActionTypes.js';
import reducer from '../../reducer/reducer.js';
import getOperationData from '../getOperationData.js';

describe('selector getOperationData', () => {
  it('should return data value by select path and data key', () => {
    const selectPath = ['randomPath1', 'randomPath2'];
    const dataKey = 'randomDataKey';
    const dataValue = 'randomDataValue';
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getOperationData(store.getState(), selectPath, dataKey)).toEqual(
      undefined
    );
    store.dispatch({
      type: MERGE_OPERATION_DATA,
      payload: { data: { [dataKey]: dataValue }, selectPath },
    });
    expect(getOperationData(store.getState(), selectPath, dataKey)).toEqual(
      dataValue
    );
  });
});
