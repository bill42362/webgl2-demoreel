import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({
  isFetching: false,
  hasMore: false,
  isReverse: false,
});

class InfiniteScroller extends React.Component {
  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  getTopPosition(domElement) {
    if (!domElement) {
      return 0;
    }

    return domElement.offsetTop + this.getTopPosition(domElement.offsetParent);
  }

  getOffset(domElement, scrollTop) {
    if (!domElement) {
      return 0;
    }

    return (
      this.getTopPosition(domElement) +
      (domElement.offsetHeight - scrollTop - window.innerHeight)
    );
  }

  setScrollComponent = ref => {
    this.scrollComponent = ref;
  };

  scrollListener = () => {
    const scrollComponent = this.scrollComponent;
    const scrollElement = window;
    const parentNode = scrollComponent.parentNode;

    let offset;
    if (this.props.useWindow) {
      const doc =
        document.documentElement || document.body.parentNode || document.body;
      const scrollTop =
        scrollElement.pageYOffset !== undefined
          ? scrollElement.pageYOffset
          : doc.scrollTop;

      if (this.props.isReverse) {
        offset = scrollTop;
      } else {
        offset = this.getOffset(scrollComponent, scrollTop);
      }
    } else if (this.props.isReverse) {
      offset = parentNode.scrollTop;
    } else {
      offset =
        scrollComponent.offsetHeight -
        parentNode.scrollTop -
        parentNode.clientHeight;
    }

    if (offset < this.props.threshold && !this.props.isFetching) {
      this.detachScrollListener();

      this.props.loadMore((this.pageLoaded += 1));
    }
  };

  attachScrollListener() {
    if (!this.props.hasMore || this.props.isFetching) {
      return;
    }

    let scrollElement = window;
    if (!this.props.useWindow) {
      scrollElement = this.scrollComponent.parentNode;
    }

    scrollElement.addEventListener('scroll', this.scrollListener, {
      passive: true,
    });
    scrollElement.addEventListener('resize', this.scrollListener, false);
    this.scrollListener();
  }

  detachScrollListener() {
    let scrollElement = window;
    if (!this.props.useWindow) {
      scrollElement = this.scrollComponent.parentNode;
    }

    scrollElement.removeEventListener('scroll', this.scrollListener, {
      passive: true,
    });
    scrollElement.removeEventListener('resize', this.scrollListener, false);
  }

  render() {
    const { isFetching, hasMore, isReverse, children } = this.props;
    const scrollComponent = React.Children.only(children);
    return (
      <Provider value={{ isFetching, hasMore, isReverse }}>
        {React.cloneElement(scrollComponent, {
          ref: this.setScrollComponent,
        })}
      </Provider>
    );
  }
}

InfiniteScroller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  pageStart: PropTypes.number,
  isReverse: PropTypes.bool,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  threshold: PropTypes.number,
  useWindow: PropTypes.bool,
};

InfiniteScroller.defaultProps = {
  pageStart: 0,
  isFetching: false,
  hasMore: false,
  loadMore: () => null,
  threshold: 250,
  useWindow: true,
};

class ScrollItem extends React.Component {
  renderItems = ({ isFetching, hasMore, isReverse }) => {
    const { children, loader } = this.props;

    return isFetching && hasMore
      ? isReverse
        ? [React.cloneElement(loader, { key: 'loader' }), ...children]
        : children.concat(React.cloneElement(loader, { key: 'loader' }))
      : children;
  };

  render() {
    return <Consumer>{this.renderItems}</Consumer>;
  }
}

ScrollItem.propTypes = {
  children: PropTypes.any,
  loader: PropTypes.element,
};

ScrollItem.defaultProps = {
  loader: <div>Loading...</div>,
};

export { InfiniteScroller, ScrollItem };
export default InfiniteScroller;
