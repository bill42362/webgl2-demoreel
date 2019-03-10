// pushRouteHistory.test.js
'use strict';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

import pushRouteHistory from '../pushRouteHistory.js';
import { PUSH_ROUTE_HISTORY } from '../../ActionTypes.js';

const mockStore = configureMockStore([thunk]);

describe('action pushRouteHistory', () => {
  it('should excute without error', () => {
    const store = mockStore(fromJS({}));
    store.dispatch(pushRouteHistory({ href: 'fakeUrl' }));
  });
  it('should create an action to push history', () => {
    const store = mockStore(fromJS({}));
    const expectedActions = [{ type: PUSH_ROUTE_HISTORY, payload: 'fakeUrl' }];
    store.dispatch(pushRouteHistory({ href: 'fakeUrl' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
