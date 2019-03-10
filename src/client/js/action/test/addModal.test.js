// addModal.test.js
'use strict';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import addModal from '../addModal.js';
import { ADD_MODAL } from '../../ActionTypes.js';
import { modalTemplate } from '../../reducer/modals.js';

const mockStore = configureMockStore([thunk]);

describe('action addModal', () => {
  it('should excute without error', () => {
    const store = mockStore(fromJS({ modals: {} }));
    store.dispatch(addModal({ id: `${Math.random()}` }));
  });
  it('should create an action to add modal', () => {
    const store = mockStore(fromJS({ modals: {} }));
    const sampleModal = { id: `${Math.random()}` };
    const expectedActions = [
      {
        type: ADD_MODAL,
        payload: {
          ...modalTemplate,
          id: sampleModal.id,
          zIndex: 100,
          higherThanIds: [],
          lowerThanIds: [],
        },
      },
    ];
    store.dispatch(addModal(sampleModal));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
