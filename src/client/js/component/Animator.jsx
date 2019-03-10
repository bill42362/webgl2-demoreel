// Animator.jsx
import React from 'react';
import PropTypes from 'prop-types';

class Animator extends React.Component {
  state = {
    now: new Date(),
  };

  componentDidMount() {
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  loop = () => {
    this.setState({ now: new Date() });

    this._frameId = window.requestAnimationFrame(this.loop);
  };

  startLoop() {
    if (!this._frameId) {
      this._frameId = window.requestAnimationFrame(this.loop);
    }
  }

  stopLoop() {
    window.cancelAnimationFrame(this._frameId);
  }

  render() {
    const { children, ...props } = this.props;
    const { now } = this.state;
    const child = React.Children.only(children);

    return React.cloneElement(child, { ...props, now });
  }
}

Animator.propTypes = {
  children: PropTypes.node,
};

Animator.defaultProps = {
  children: null,
};

export default Animator;
