// HistoryModifier.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class HistoryModifier extends React.Component {
  handlePopState = () => {
    const { route } = this.props;
    const state = history.state;
    if ('root' === state) {
      history.pushState(null, '', '/');
      history.pushState(null, '', route);
    }
  };

  componentDidMount() {
    const { route, previousRoute } = this.props;
    if (null === previousRoute) {
      history.replaceState('root', '', route);
      history.pushState(null, '', '/');
      history.pushState(null, '', route);
    }
    window.addEventListener('popstate', this.handlePopState, false);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  render() {
    return <StyledHistoryModifier />;
  }
}

HistoryModifier.propTypes = {
  route: PropTypes.string,
  previousRoute: PropTypes.string,
};

HistoryModifier.defaultProps = {
  route: '/',
  previousRoute: null,
};

const StyledHistoryModifier = styled.div``;

export default HistoryModifier;
