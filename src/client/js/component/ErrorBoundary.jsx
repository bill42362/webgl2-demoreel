// ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = { error: null };

  async componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children, errorElement, onErrorResolved } = this.props;
    if (error) {
      return React.cloneElement(errorElement, {
        onErrorResolved: () => {
          onErrorResolved();
          this.setState({ error: null });
        },
      });
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  context: PropTypes.string,
  errorElement: PropTypes.node,
  children: PropTypes.node,
  onErrorResolved: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  context: '',
  errorElement: 'Oops! Something went wrong. :(',
  children: '',
  onErrorResolved: () => null,
};

export default ErrorBoundary;
