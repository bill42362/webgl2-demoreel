// persist.js
'use strict';
import localforage from 'localforage';

export const clearState = localforage.clear;

export const loadState = async () => {
  try {
    const reducerKeys = await localforage.getItem('_reducerKeys');
    const reducers = await Promise.all(
      reducerKeys.map(async reducerKey => ({
        key: reducerKey,
        data: await localforage.getItem(reducerKey),
      }))
    );
    return reducers.reduce((current, reducer) => {
      current[reducer.key] = reducer.data;
      return current;
    }, {});
  } catch (error) {
    return {};
  }
};

let nextSaveTimestamp = Date.now() + 3000;
let saveTimeout = undefined;
export const saveState = async ({ state }) => {
  clearTimeout(saveTimeout);
  nextSaveTimestamp = Date.now() + 3000;

  const reducerKeys = Object.keys(state);
  return Promise.all([
    ...reducerKeys.map(reducerKey => {
      return localforage.setItem(reducerKey, state[reducerKey]);
    }),
    localforage.setItem('_reducerKeys', reducerKeys),
  ]);
};

export const throttleSaveState = async ({ getState }) => {
  clearTimeout(saveTimeout);
  const state = getState();
  saveTimeout = setTimeout(() => {
    saveState({ state });
  }, Math.max(0, nextSaveTimestamp - Date.now()));
};

export default { loadState, saveState, throttleSaveState, clearState };
