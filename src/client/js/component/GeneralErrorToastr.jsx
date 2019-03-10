// GeneralErrorToastr.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { red } from '../style/colors.js';
import PeekFromTop from '../style/PeekFromTop.js';

export const GeneralErrorToastr = ({ durationSec, t }) => {
  return (
    <StyledGeneralErrorToastr durationSec={durationSec}>
      {t('retry_failed_reason')}
    </StyledGeneralErrorToastr>
  );
};

GeneralErrorToastr.propTypes = {
  durationSec: PropTypes.number,
  t: PropTypes.func.isRequired,
};

GeneralErrorToastr.defaultProps = {
  durationSec: 4,
};

const StyledGeneralErrorToastr = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 32px;
  background-color: ${red};
  padding-top: 4px;
  text-align: center;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 200;
  z-index: 199;

  animation: ${({ durationSec }) => durationSec}s forwards ${PeekFromTop};
`;

export default withTranslation()(GeneralErrorToastr);
