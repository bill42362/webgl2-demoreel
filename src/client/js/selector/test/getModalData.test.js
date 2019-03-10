// getModalData.test.js
'use strict';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ADD_MODAL } from '../../ActionTypes.js';
import reducer from '../../reducer/reducer.js';
import { modalTemplate } from '../../reducer/modals.js';
import getModalData from '../getModalData.js';

describe('selector getModalData', () => {
  it('should return modal data by modal id', () => {
    const id = 'randomModalId';
    const dataKey = 'zIndex';
    const dataValue = Math.random();
    const sampleModal = { ...modalTemplate, [dataKey]: dataValue, id };
    const store = createStore(reducer, applyMiddleware(thunk));
    expect(getModalData(store.getState(), id, dataKey)).toEqual(undefined);
    store.dispatch({ type: ADD_MODAL, payload: sampleModal });
    expect(getModalData(store.getState(), id, dataKey)).toEqual(dataValue);
    expect(getModalData(store.getState(), id, 'nextIds')).toEqual([]);
  });
});
