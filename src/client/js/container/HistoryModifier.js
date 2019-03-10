// HistoryModifier.js
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import getRouteHistory from '../selector/getRouteHistory.js';
import HistoryModifier from '../component/HistoryModifier.jsx';

const mapStateToProps = (state, { location: { pathname, search } }) => {
  return {
    route: `${pathname}${search}`,
    previousRoute: getRouteHistory(state, 'previousRoute'),
  };
};

export default withRouter(connect(mapStateToProps)(HistoryModifier));
