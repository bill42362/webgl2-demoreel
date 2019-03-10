// withVia.js
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getDisplayName from './getDisplayName.js';
import getMeData from '../selector/getMeData.js';
import getRouteHistory from '../selector/getRouteHistory.js';

const mapStateToProps = state => {
  const messagesBox = getMeData(state, 'messagesBox');
  return {
    messagesBoxId: messagesBox && messagesBox.listId,
    previousRoute: getRouteHistory(state, 'previousRoute'),
  };
};

const withVia = WrappedComponent => {
  class withVia extends React.PureComponent {
    getVia() {
      const { previousRoute, messagesBoxId } = this.props;
      if (location.pathname === '/') {
        return 'home';
      }
      if (previousRoute == null) {
        return 'direct';
      }
      if (previousRoute.includes('chat')) {
        return 'chatroom';
      }
      if (previousRoute.includes('user')) {
        return 'profile';
      }
      if (previousRoute.includes('inbox')) {
        return 'inbox';
      }
      if (previousRoute.includes('profile')) {
        if (messagesBoxId === 'messagePacks') {
          return 'messagepack';
        }
        return messagesBoxId;
      }
    }

    render() {
      const via = this.props.via || this.getVia();
      const props = Object.keys(this.props).reduce((acc, key) => {
        const isIncluded = [
          'messagesBoxId',
          'previousRoute',
          'hasHd',
          'via',
        ].includes(key);

        return isIncluded ? acc : { ...acc, [key]: this.props[key] };
      }, {});

      return React.createElement(WrappedComponent, { ...props, via });
    }
  }

  withVia.propTypes = {
    messagesBoxId: PropTypes.string,
    previousRoute: PropTypes.string,
    via: PropTypes.string,
  };

  if (process.env.NODE_ENV !== 'production') {
    withVia.displayName = `withVia(${getDisplayName(WrappedComponent)})`;
  }

  return connect(mapStateToProps)(withVia);
};

export default withVia;
