// getJointNetworkingSummary.test.js
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
import getJointNetworkingSummary from '../getJointNetworkingSummary.js';

const selectPath1 = ['randomPath1-1', 'randomPath2-1'];
const selectPath2 = ['randomPath1-1', 'randomPath2-2'];
const selectPath3 = ['randomPath1-3', 'randomPath2-3'];

describe('selector getJointNetworkingSummary', () => {
  it('should return joint networking summary by two select paths', () => {
    const selectPaths = [selectPath1, selectPath2];
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'idle',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_FETCHING,
      payload: { selectPath: selectPath1 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'fetching',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_SUCCESS,
      payload: { selectPath: selectPath1 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'intermediate',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_FETCHING,
      payload: { selectPath: selectPath2 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'fetching',
      error: null,
    });

    const sampleError = new Error('randomError');
    store.dispatch({
      type: SET_NETWORKING_ERROR,
      payload: { selectPath: selectPath2, error: sampleError },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'error',
      error: sampleError,
    });

    store.dispatch({
      type: SET_NETWORKING_SUCCESS,
      payload: { selectPath: selectPath2 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'fetched',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_IDLE,
      payload: { selectPath: selectPath1 },
    });
    store.dispatch({
      type: SET_NETWORKING_IDLE,
      payload: { selectPath: selectPath2 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'idle',
      error: null,
    });
  });
  it('should return joint networking summary by more select paths', () => {
    const selectPaths = [selectPath1, selectPath2, selectPath3];
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'idle',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_FETCHING,
      payload: { selectPath: selectPath3 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'fetching',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_SUCCESS,
      payload: { selectPath: selectPath3 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'intermediate',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_FETCHING,
      payload: { selectPath: selectPath3 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'fetching',
      error: null,
    });

    const sampleError = new Error('randomError');
    store.dispatch({
      type: SET_NETWORKING_ERROR,
      payload: { selectPath: selectPath3, error: sampleError },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'error',
      error: sampleError,
    });

    const sampleError2 = new Error('randomError2');
    store.dispatch({
      type: SET_NETWORKING_ERROR,
      payload: { selectPath: selectPath1, error: sampleError2 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'error',
      error: sampleError2,
    });

    store.dispatch({
      type: SET_NETWORKING_SUCCESS,
      payload: { selectPath: selectPath1 },
    });
    store.dispatch({
      type: SET_NETWORKING_SUCCESS,
      payload: { selectPath: selectPath2 },
    });
    store.dispatch({
      type: SET_NETWORKING_SUCCESS,
      payload: { selectPath: selectPath3 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'fetched',
      error: null,
    });

    store.dispatch({
      type: SET_NETWORKING_IDLE,
      payload: { selectPath: selectPath1 },
    });
    store.dispatch({
      type: SET_NETWORKING_IDLE,
      payload: { selectPath: selectPath2 },
    });
    store.dispatch({
      type: SET_NETWORKING_IDLE,
      payload: { selectPath: selectPath3 },
    });
    expect(getJointNetworkingSummary(store.getState(), selectPaths)).toEqual({
      status: 'idle',
      error: null,
    });
  });
});
