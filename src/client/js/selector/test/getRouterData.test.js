// getRouterData.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { push } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';

import { createRootReducer } from '../../reducer/reducer.js';
import getRouterData from '../getRouterData.js';

const history = createBrowserHistory();

describe('selector getRouterData', () => {
  it('should return router data by data key', () => {
    const store = createStore(
      createRootReducer(history),
      applyMiddleware(thunk)
    );
    expect(getRouterData(store.getState(), 'action')).toEqual('POP');
  });
  it('should return router data by the array key', () => {
    const store = createStore(
      createRootReducer(history),
      applyMiddleware(thunk)
    );
    store.dispatch(push('/test', { from: '/' }));

    expect(getRouterData(store.getState(), ['location'])).toEqual({
      hash: '',
      pathname: '/',
      search: '',
      state: undefined,
    });
  });
});
