// getRouteHistory.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../../reducer/reducer.js';
import getRouteHistory from '../getRouteHistory.js';
import { PUSH_ROUTE_HISTORY } from '../../ActionTypes.js';

describe('selector getRouteHistory', () => {
  it('should return data by data key', () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/chat/111',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/222',
    });
    expect(getRouteHistory(store.getState(), 'previousRoute')).toEqual(
      '/chat/111'
    );
    expect(getRouteHistory(store.getState(), 'currentRoute')).toEqual(
      '/message/222'
    );
    expect(getRouteHistory(store.getState(), 'match', 'message')).toEqual(
      '/message/222'
    );
    expect(getRouteHistory(store.getState(), 'match', '/message/333')).toEqual(
      undefined
    );
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/333',
    });
    expect(getRouteHistory(store.getState(), 'lastPageUrl')).toEqual(
      '/message/222'
    );
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/222',
    });
    expect(getRouteHistory(store.getState(), 'lastPageUrl')).toEqual('/');
  });
  it('should handle `lastPageUrl`', () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/chat/111',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/222',
    });
    expect(getRouteHistory(store.getState(), 'lastPageUrl')).toEqual(
      '/chat/111'
    );
  });
  it('should return `/` when no last page with `lastPageUrl` query', () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getRouteHistory(store.getState(), 'lastPageUrl')).toEqual('/');
  });
  it('should handle loop condition with `lastPageUrl` query', () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/chat/111',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/222',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/333',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/222',
    });
    expect(getRouteHistory(store.getState(), 'lastPageUrl')).toEqual('/');
  });
  it('should handle loop and no last condition with `lastPageUrl` query', () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/chat/111',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/message/222',
    });
    store.dispatch({
      type: PUSH_ROUTE_HISTORY,
      payload: '/chat/111',
    });
    expect(getRouteHistory(store.getState(), 'lastPageUrl')).toEqual('/');
  });
});
