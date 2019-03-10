// PageviewTracker.jsx
import React from 'react';
import PropTypes from 'prop-types';

import trackEvent, { PAGEVIEW } from '../resource/trackEvent.js';

class PageviewTracker extends React.Component {
  componentDidMount() {
    const { route, title, isLanding, pushRouteHistory } = this.props;
    if (route) {
      pushRouteHistory({ route });
      if (isLanding) {
        trackEvent({ type: PAGEVIEW, payload: { route, title } });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { route, previousRoute, title, pushRouteHistory } = this.props;
    const { route: prevRoute, previousRoute: prevPreviousRoute } = prevProps;
    if (route && route !== prevRoute) {
      pushRouteHistory({ route });
    }
    // Need to seperate 'if' because of async store update issue.
    if (previousRoute && previousRoute !== prevPreviousRoute) {
      trackEvent({ type: PAGEVIEW, payload: { route, previousRoute, title } });
    }
  }

  render() {
    return this.props.children;
  }
}

PageviewTracker.propTypes = {
  route: PropTypes.string,
  previousRoute: PropTypes.string,
  isLanding: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  pushRouteHistory: PropTypes.func,
};

PageviewTracker.defaultProps = {
  route: '',
  previousRoute: '',
  isLanding: false,
  title: '',
  children: null,
  pushRouteHistory: () => null,
};

export default PageviewTracker;
