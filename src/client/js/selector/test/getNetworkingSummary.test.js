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
  it('should return summary (`idle`, `error`, `fetching` or `fetched`) by select path', () => {
    const selectPath = ['randomPath1', 'randomPath2'];
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual('idle');

    store.dispatch({ type: SET_NETWORKING_FETCHING, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual(
      'fetching'
    );

    store.dispatch({ type: SET_NETWORKING_SUCCESS, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual(
      'fetched'
    );

    store.dispatch({ type: SET_NETWORKING_FETCHING, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual(
      'fetching'
    );

    store.dispatch({
      type: SET_NETWORKING_ERROR,
      payload: { error: new Error('randomError'), selectPath },
    });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual('error');

    store.dispatch({ type: SET_NETWORKING_IDLE, payload: { selectPath } });
    expect(getNetworkingSummary(store.getState(), selectPath)).toEqual('idle');
  });
});
