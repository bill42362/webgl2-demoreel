// RegExpRoute.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';

class RegExpRoute extends React.Component {
  render() {
    const { location, regExp, ...rest } = this.props;
    if (regExp.test(location.pathname)) {
      return <Route {...rest} />;
    } else {
      return null;
    }
  }
}

RegExpRoute.propTypes = {
  location: PropTypes.object.isRequired,
  regExp: PropTypes.object,
};

RegExpRoute.defaultProps = {
  regExp: /.*/,
};

export default withRouter(RegExpRoute);
