// AutoResizeImage.jsx
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class AutoResizeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isResized: false, width: 'auto', height: '100%' };
    this.onLoad = this.onLoad.bind(this);
  }

  resizeImage({ width, height }) {
    if (this.state.isResized) {
      return;
    }
    const baseRect = this.base.getBoundingClientRect();
    const baseAspectRatio = baseRect.width / baseRect.height;
    const imageAspectRatio = width / height;
    if (baseAspectRatio > imageAspectRatio) {
      this.setState({
        width: baseRect.width,
        height: 'auto',
        isResized: true,
      });
    } else {
      this.setState({
        height: baseRect.height,
        width: 'auto',
        isResized: true,
      });
    }
  }

  resizeFitImage({ width, height }) {
    if (this.state.isResized) {
      return;
    }
    const baseRect = this.base.getBoundingClientRect();
    const baseAspectRatio = baseRect.width / baseRect.height;
    const imageAspectRatio = width / height;
    if (baseAspectRatio > imageAspectRatio) {
      this.setState({
        height: baseRect.height,
        width: 'auto',
        isResized: true,
      });
    } else {
      this.setState({
        width: baseRect.width,
        height: 'auto',
        isResized: true,
      });
    }
  }

  onLoad(e) {
    const { isFit, isFitGapWidth, onLoad } = this.props;
    if (isFitGapWidth) {
      if (
        (isFit && window.screen.width > isFitGapWidth) ||
        (!isFit && window.screen.width < isFitGapWidth)
      ) {
        this.resizeFitImage({
          width: e.target.naturalWidth,
          height: e.target.naturalHeight,
        });
      } else {
        this.resizeImage({
          width: e.target.naturalWidth,
          height: e.target.naturalHeight,
        });
      }
    } else {
      isFit
        ? this.resizeFitImage({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          })
        : this.resizeImage({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          });
    }

    onLoad(e);
  }

  componentDidMount() {
    const { width, height } = this.image;
    const { isFit, isFitGapWidth } = this.props;
    if (width) {
      if (isFitGapWidth) {
        if (
          (isFit && window.screen.width > isFitGapWidth) ||
          (!isFit && window.screen.width < isFitGapWidth)
        ) {
          this.resizeFitImage({ width, height });
        } else {
          this.resizeImage({ width, height });
        }
      } else {
        isFit
          ? this.resizeFitImage({ width, height })
          : this.resizeImage({ width, height });
      }
    }
  }

  render() {
    const { width, height } = this.state;
    const { children, style, ...restProps } = this.props;
    const childArray = Array.isArray(children) ? children : [children];
    const [image] = childArray.slice(-1);
    const restChildren = childArray.slice(0, -1);
    return (
      <StyledAutoResizeImage ref={el => (this.base = el)}>
        <Picture
          {...restProps}
          style={{ ...style, width, height }}
          onLoad={this.onLoad}
          ref={el => (this.image = el)}
        >
          {restChildren}
          {React.cloneElement(image, {
            style: { ...image.props.style, width, height },
          })}
        </Picture>
      </StyledAutoResizeImage>
    );
  }
}

AutoResizeImage.propTypes = {
  children: PropTypes.node,
  onLoad: PropTypes.func,
  style: PropTypes.object,
  isFit: PropTypes.bool,
  isFitGapWidth: PropTypes.number,
};

AutoResizeImage.defaultProps = {
  children: <img />,
  onLoad: () => null,
  style: {},
  isFit: false,
  isFitGapWidth: null,
};

const StyledAutoResizeImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Picture = styled.picture`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default AutoResizeImage;
