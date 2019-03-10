// StatefulImage.jsx
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class StatefulImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadState: 'loading' };
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad({ event, targetOnLoad }) {
    this.setState({ loadState: 'loaded' });
    if (targetOnLoad) {
      targetOnLoad(event);
    }
  }

  render() {
    const { loadState } = this.state;
    const { children } = this.props;
    const [target, loading, error] =
      children instanceof Array
        ? ['target', 'loading', 'error'].map(key => {
            return children.find(child => key === child.props['data-key']);
          })
        : [children];
    return (
      <StyledStatefulImage>
        {'loading' === loadState && <Loading>{loading}</Loading>}
        {'error' === loadState && <ErrorElement>{error}</ErrorElement>}
        {React.isValidElement(target) &&
          React.cloneElement(target, {
            onLoad: event =>
              this.onLoad({ targetOnLoad: target.props['onLoad'], event }),
            onError: () => this.setState({ loadState: 'error' }),
            style: {
              ...target.props['style'],
              opacity: 'loaded' === loadState ? '1' : '0',
            },
          })}
      </StyledStatefulImage>
    );
  }
}

StatefulImage.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledStatefulImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Loading = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const ErrorElement = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export default StatefulImage;
