// ModalView.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalView = ({ zIndex, status, children }) => {
  if (!zIndex) {
    return null;
  }
  return createPortal(
    <StyledModalView zIndex={zIndex}>
      {React.cloneElement(children, { status })}
    </StyledModalView>,
    document.querySelector('#modal-root')
  );
};

ModalView.propTypes = {
  zIndex: PropTypes.number,
  status: PropTypes.string,
  children: PropTypes.object.isRequired,
};

ModalView.defaultTypes = {
  zIndex: null,
  status: 'display',
};

const StyledModalView = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${({ zIndex }) => zIndex};
`;

export default ModalView;
