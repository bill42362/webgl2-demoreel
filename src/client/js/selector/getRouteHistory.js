// getRouteHistory.js
'use strict';
import createCachedSelector from 're-reselect';

/**
 * Select route history by data key
 * @kind selector
 * @param {Immutable.Map} state - root state.
 * @param {string} {dataKey} - select key. ['previousRoute', 'currentRoute', 'match', 'lastPageUrl']
 * @param {RegExp} {regexp} - regexp for match data key.
 * @return {string} The selected route history.
 */
const getRouteHistory = createCachedSelector(
  state => state,
  state => state.getIn(['routeHistory', 'stack']),
  (state, dataKey) => dataKey,
  (state, dataKey, regexp) => regexp,
  (state, stack, dataKey, regexp) => {
    let result = undefined;
    if (dataKey === 'previousRoute') {
      result = stack.get(-2);
    } else if (dataKey === 'currentRoute') {
      result = stack.get(-1);
    } else if (dataKey === 'match') {
      result = stack.findLast(r => r.match(regexp));
    } else if ('lastPageUrl' === dataKey) {
      const previousRoute = stack.get(-2);
      result = previousRoute || '/';

      const currentRoute = stack.get(-1);
      const lastTwoRoute = stack.get(-3);
      if (lastTwoRoute === currentRoute) {
        const noCurrentStack = stack.filter(r => r !== currentRoute);
        const noMessageStack = noCurrentStack.filter(
          r => !r.match(/^\/(message|chat|user)\/.+/gi)
        );
        result = noMessageStack.get(-1) || '/';
      }
    }
    return result;
  }
)((state, dataKey, regexp) => `${dataKey}:${regexp}`);

export default getRouteHistory;
