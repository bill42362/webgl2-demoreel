// getNetworkingData.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_ERROR,
} from '../../ActionTypes.js';
import reducer from '../../reducer/reducer.js';
import getNetworkingData from '../getNetworkingData.js';

describe('selector getNetworkingData', () => {
  it('should return data value by select path and data key', () => {
    const selectPath = ['randomPath1', 'randomPath2'];
    const dataKey = 'isFetching';
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getNetworkingData(store.getState(), selectPath, dataKey)).toEqual(
      undefined
    );
    store.dispatch({ type: SET_NETWORKING_FETCHING, payload: { selectPath } });
    expect(getNetworkingData(store.getState(), selectPath, dataKey)).toEqual(
      true
    );
    store.dispatch({
      type: SET_NETWORKING_ERROR,
      payload: { selectPath, error: { message: 'test error' } },
    });
    expect(getNetworkingData(store.getState(), selectPath, 'error')).toEqual({
      message: 'test error',
    });
  });
});
