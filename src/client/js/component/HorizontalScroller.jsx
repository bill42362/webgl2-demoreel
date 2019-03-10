// HorizontalScroller.jsx
import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({
  childProps: [],
});

class HorizontalScroller extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.setLastElement = this.setLastElement.bind(this);
  }

  setLastElement(element) {
    if (element && !element.props) {
      this.lastElement = element;
    }
  }

  onScroll() {
    const { isNextPageFetching, fetchNextPage } = this.props;
    if (this.lastElement) {
      const { left } = this.lastElement.getBoundingClientRect();
      if (window.innerWidth < left && !isNextPageFetching && fetchNextPage) {
        fetchNextPage();
      }
    }
  }

  componentDidMount() {
    const element = this._element;
    element.addEventListener('scroll', this.onScroll, true);
  }

  componentWillUnmount() {
    const element = this._element;
    element.removeEventListener('scroll', this.onScroll, true);
  }

  render() {
    const { children, childProps } = this.props;
    const child = React.Children.only(children);
    return (
      <Provider
        value={{
          childProps: childProps,
          setLastElement: this.setLastElement,
        }}
      >
        {React.cloneElement(child, {
          ref: el => (this._element = el),
        })}
      </Provider>
    );
  }
}

HorizontalScroller.propTypes = {
  children: PropTypes.node.isRequired,
  childProps: PropTypes.array.isRequired,
  pageLength: PropTypes.number,
  isNextPageFetching: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

HorizontalScroller.defaultProps = {
  pageLength: 2,
  isNextPageFetching: false,
  fetchNextPage: () => null,
};

export class HorizontalScrollerElement extends React.Component {
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
              const child = render(childProp);
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

HorizontalScrollerElement.propTypes = {
  render: PropTypes.func.isRequired,
  isNextPageFetching: PropTypes.bool,
  loader: PropTypes.node,
};

HorizontalScrollerElement.defaultProps = {
  isNextPageFetching: false,
  loader: <div>Loading...</div>,
};

export default HorizontalScroller;
