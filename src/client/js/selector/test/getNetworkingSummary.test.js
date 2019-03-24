// getNetworkingSummary.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  SET_NETWORKING_FETCHING,
  SET_NETWORKING_SUCCESS,
  SET_NETWORKING_ERROR,
  SET_NETWORKING_IDLE,
} from '../../ActionTypes.js';
import reducer from '../../reducer/reducer.js';
import getNetworkingSummary from '../getNetworkingSummary.js';

describe('selector getNetworkingSummary', () => {
  it("should return status ['idle', 'error', 'fetching', 'fetched'], and error by select path", () => {
    const selectPath = ['randomPath1', 'randomPath2'];
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual({
      status: 'idle',
      error: null,
    });

    store.dispatch({ type: SET_NETWORKING_FETCHING, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual({
      status: 'fetching',
      error: null,
    });

    store.dispatch({ type: SET_NETWORKING_SUCCESS, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual({
      status: 'fetched',
      error: null,
    });

    store.dispatch({ type: SET_NETWORKING_FETCHING, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual({
      status: 'fetching',
      error: null,
    });

    const sampleError = new Error('randomError');
    store.dispatch({
      type: SET_NETWORKING_ERROR,
      payload: { error: sampleError, selectPath },
    });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual({
      status: 'error',
      error: sampleError,
    });

    store.dispatch({ type: SET_NETWORKING_IDLE, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual({
      status: 'idle',
      error: null,
    });
  });
});
