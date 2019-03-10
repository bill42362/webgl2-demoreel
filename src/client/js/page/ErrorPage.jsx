// ErrorPage.jsx
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { yellow, grey } from '../style/colors.js';

import ErrorIconSource from '../../img/error-outline.svg';

class ErrorPage extends React.Component {
  render() {
    const { onErrorResolved, t } = this.props;
    return (
      <StyledErrorPage>
        <Title>WebGL2 Demoreel</Title>
        <ErrorIcon src={ErrorIconSource} aria-hidden />
        <SubTitle>Oops!</SubTitle>
        <Description>{t('something_went_wrong')}</Description>
        <ReportFeedback onClick={() => null}>{t('bug_report')}</ReportFeedback>
        <BackToHome onClick={() => onErrorResolved()}>
          {t('back_to_home')}
        </BackToHome>
      </StyledErrorPage>
    );
  }
}

ErrorPage.propTypes = {
  onErrorResolved: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ErrorPage.defaultProps = {
  onErrorResolved: () => {
    location.href = '/';
  },
};

const StyledErrorPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  letter-spacing: 1px;
`;

const Title = styled.h2`
  margin: 0px;
  font-size: 40px;
  text-align: center;
  font-weight: 500;
`;

const ErrorIcon = styled.img`
  margin-top: 28px;
  width: 76px;
  height: auto;
`;

const SubTitle = styled.h3`
  margin: 16px 0px 0px;
  font-size: 30px;
  text-align: center;
  font-weight: 300;
`;

const Description = styled.h4`
  margin: 8px 0px 0px;
  font-size: 14px;
  text-align: center;
  font-weight: 300;
`;

const Button = styled.button`
  min-width: 160px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${grey};
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  color: ${grey};
  font-weight: 300;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const ReportFeedback = styled(Button)`
  margin-top: 76px;
  border-color: ${yellow};
  color: ${yellow};
`;

const BackToHome = styled(Button)`
  margin-top: 12px;
`;

export default withTranslation()(ErrorPage);
