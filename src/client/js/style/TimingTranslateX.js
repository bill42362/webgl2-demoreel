// TimingTranslateX.js
'use strict';
import { keyframes } from 'styled-components';

export const TimingTranslateX = ({ from, to, timing }) => keyframes`
  0% { transform: translateX(${from}); }
  ${timing}% { transform: translateX(${to}); }
  100% { transform: translateX(${to}); }
`;

export default TimingTranslateX;
