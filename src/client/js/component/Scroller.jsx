// Scroller.jsx
import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({ childProps: [] });

class Scroller extends React.Component {
  constructor(props) {
    super(props);
  }

  setLastElement = element => {
    if (element && !element.props) {
      this.lastElement = element;
    }
  };

  onScroll = () => {
    const {
      loadMoreOffset,
      loadMoreOffsetRef,
      isNextPageFetching,
      fetchNextPage,
    } = this.props;
    if (!this.lastElement) {
      return;
    }
    const lastRect = this.lastElement.getBoundingClientRect();
    const refBottom = loadMoreOffsetRef
      ? loadMoreOffsetRef.getBoundingClientRect().bottom
      : window.innerHeight;
    const shouldLoadMore = loadMoreOffset > lastRect.bottom - refBottom;
    if (shouldLoadMore && !isNextPageFetching && fetchNextPage) {
      fetchNextPage();
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { children, childProps } = this.props;
    const child = React.Children.only(children);
    return (
      <Provider
        value={{
          setLastElement: this.setLastElement,
          childProps,
        }}
      >
        {React.cloneElement(child)}
      </Provider>
    );
  }
}

Scroller.propTypes = {
  children: PropTypes.node.isRequired,
  childProps: PropTypes.array.isRequired,
  loadMoreOffset: PropTypes.number,
  loadMoreOffsetRef: PropTypes.node,
  isNextPageFetching: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

Scroller.defaultProps = {
  loadMoreOffset: 100,
  isNextPageFetching: false,
};

export class ScrollerElement extends React.Component {
  render() {
    const { render, isNextPageFetching, loader } = this.props;
    const appends = [];
    if (isNextPageFetching) {
      appends.push(React.cloneElement(loader, { key: 'loader' }));
    }
    return (
      <Consumer>
        {({ childProps, setLastElement }) => {
          return childProps
            .map((childProp, index) => {
              const child = render(childProp, index);
              if (childProps.length - 1 === index) {
                return React.cloneElement(child, {
                  key: JSON.stringify(childProp),
                  ref: setLastElement,
                });
              }
              return React.cloneElement(child, {
                key: JSON.stringify(childProp),
              });
            })
            .concat(appends);
        }}
      </Consumer>
    );
  }
}

ScrollerElement.propTypes = {
  render: PropTypes.func.isRequired,
  isNextPageFetching: PropTypes.bool,
  loader: PropTypes.node,
};

ScrollerElement.defaultProps = {
  isNextPageFetching: false,
  loader: <div>Loading...</div>,
};

export default Scroller;
