// Home.js
import { connect } from 'react-redux';
import Home from '../page/Home.jsx';

const mapStateToProps = () => {
  return {
    someString: 'Home',
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
