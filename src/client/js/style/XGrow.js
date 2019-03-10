// XGrow.js
'use strict';
import { css, keyframes } from 'styled-components';

export const XGrowKeyframes = keyframes`
  0% { width: 0%; }
  100% { width: 98%; }
`;

export const XGrow = css`
  ${XGrowKeyframes}
`;

export default XGrow;
