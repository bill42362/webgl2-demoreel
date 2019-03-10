// PageviewTracker.js
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import getRouteHistory from '../selector/getRouteHistory.js';
import pushRouteHistory from '../action/pushRouteHistory.js';
import PageviewTracker from '../component/PageviewTracker.jsx';

const mapStateToProps = (state, { location: { pathname, search } }) => {
  return {
    route: `${pathname}${search}`,
    previousRoute: getRouteHistory(state, 'previousRoute'),
    isLanding: !getRouteHistory(state, 'match', '/'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushRouteHistory: ({ route }) =>
      dispatch(pushRouteHistory({ href: route })),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageviewTracker)
);
