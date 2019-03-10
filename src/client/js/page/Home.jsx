// Home.jsx
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Home extends React.Component {
  render() {
    const { someString } = this.props;
    return <StyledHome>{someString}</StyledHome>;
  }
}

Home.propTypes = {
  someString: PropTypes.string,
};

Home.defaultProps = {
  someString: 'Home',
};

const StyledHome = styled.div`
  position: relative;
`;

export default Home;
