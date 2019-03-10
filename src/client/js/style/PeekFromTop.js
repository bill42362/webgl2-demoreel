// PeekFromTop.js
'use strict';
import { css, keyframes } from 'styled-components';

export const PeekFromTopKeyframes = keyframes`
  0% { transform: translateY(-100%);}
  15% { transform: translateY(0%);}
  85% { transform: translateY(0%);}
  100% {transform: translateY(-100%);}
`;

export const PeekFromTop = css`
  ${PeekFromTopKeyframes}
`;

export default PeekFromTop;
