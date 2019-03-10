// ModalviewTracker.jsx
import React from 'react';
import PropTypes from 'prop-types';

import trackEvent, { MODALVIEW } from '../resource/trackEvent.js';

class ModalviewTracker extends React.Component {
  componentDidMount() {
    const { route } = this.props;
    if (route) {
      trackEvent({ type: MODALVIEW, payload: { route } });
    }
  }

  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(children, props);
  }
}

ModalviewTracker.propTypes = {
  route: PropTypes.string,
  children: PropTypes.node,
};

ModalviewTracker.defaultProps = {
  route: '',
  children: '',
};

export default ModalviewTracker;
