// StatusSlider.js
'use strict';
import { css } from 'styled-components';
import TimingTranslateX from './TimingTranslateX.js';

export const StatusSlider = ({ status, timing, duration }) => {
  let from = '',
    to = '';
  if ('leaving' === status) {
    from = '0vw';
    to = '-100vw';
  } else if ('backing' === status) {
    from = '-100vw';
    to = '0vw';
  } else if ('coming' === status) {
    from = '100vw';
    to = '0vw';
  } else if ('reversing' === status) {
    from = '0vw';
    to = '100vw';
  }
  if (from) {
    return `
    animation: ${duration} forwards ease-out ${TimingTranslateX({
      from,
      to,
      timing,
    })};
  `;
  }
  return '';
};

export default css`
  ${StatusSlider}
`;
