// removeModals.test.js
'use strict';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

import removeModals from '../removeModals.js';
import { REMOVE_MODALS } from '../../ActionTypes.js';

const mockStore = configureMockStore([thunk]);
const ids = ['randomModal1', 'randomModal2'];
const preStore = {
  modals: {
    randomModal1: {
      id: 'randomModal1',
      nextIds: ['randomModal3', 'randomModal4'],
    },
    randomModal2: {
      id: 'randomModal2',
      nextIds: ['randomModal5', 'randomModal6'],
    },
  },
};

describe('action removeModals', () => {
  it('should excute without error', () => {
    const store = mockStore(fromJS({ modals: {} }));
    store.dispatch(removeModals({ ids })).catch(console.error);
  });
  it('should create an action to remove modals', () => {
    const store = mockStore(fromJS({ modals: {} }));
    const expectedActions = [{ type: REMOVE_MODALS, payload: { ids } }];
    store.dispatch(removeModals({ ids }));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create an action to remove followed modals', () => {
    const store = mockStore(fromJS(preStore));
    const expectedActions = [
      {
        type: REMOVE_MODALS,
        payload: {
          ids: [
            'randomModal1',
            ...preStore.modals.randomModal1.nextIds,
            'randomModal2',
            ...preStore.modals.randomModal2.nextIds,
          ],
        },
      },
    ];
    store.dispatch(removeModals({ ids }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
