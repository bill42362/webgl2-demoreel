// ChunkLoading.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import XGrow from '../style/XGrow.js';

const ChunkLoading = ({ durationSec }) => {
  return (
    <StyledChunkLoading>
      <ProgressBar durationSec={durationSec} />
    </StyledChunkLoading>
  );
};

ChunkLoading.propTypes = {
  durationSec: PropTypes.number,
};

ChunkLoading.defaultProps = {
  durationSec: 2,
};

const StyledChunkLoading = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 4px;
  background-color: #0a0a0a;
  z-index: 200;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0%;
  height: 100%;
  background-color: #00d2be;

  animation: ${({ durationSec }) => durationSec}s forwards ${XGrow};
`;

export default ChunkLoading;
