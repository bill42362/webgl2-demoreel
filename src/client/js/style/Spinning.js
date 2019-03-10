// Spinning.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SpinningKeyframes = keyframes`
  from  { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinning = css`
  ${SpinningKeyframes};
`;

export default Spinning;
