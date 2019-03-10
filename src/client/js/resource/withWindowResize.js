// withWindowResize.js
import React from 'react';
import getDisplayName from './getDisplayName.js';

const withWindowResize = BaseComponent => {
  class withWindowResize extends React.Component {
    state = {
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0,
      screenWidth: 0,
      screenHeight: 0,
    };

    componentDidMount() {
      this.resizeListener();
      window.addEventListener('resize', this.resizeListener);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeListener);
    }

    resizeListener = () => {
      const {
        screen,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
      } = window;
      this.setState({
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        screenWidth: screen.width,
        screenHeight: screen.height,
      });
    };

    render() {
      return React.createElement(BaseComponent, {
        ...this.props,
        ...this.state,
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    withWindowResize.displayName = `withWindowResize(${getDisplayName(
      BaseComponent
    )})`;
  }

  return withWindowResize;
};

export default withWindowResize;
