// getListData.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ADD_LIST_ITEMS } from '../../ActionTypes.js';
import reducer from '../../reducer/reducer.js';
import getListData from '../getListData.js';

describe('selector getListData', () => {
  it('should return list data by data key', () => {
    const dataKey = 'itemIds';
    const selectPath = ['randomPath1', 'randomPath2'];
    const itemIds = ['randomId1', 'randomId2'];
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getListData(store.getState(), selectPath, dataKey)).toEqual(
      undefined
    );
    store.dispatch({ type: ADD_LIST_ITEMS, payload: { selectPath, itemIds } });
    expect(getListData(store.getState(), selectPath, dataKey)).toEqual(itemIds);
  });
});
