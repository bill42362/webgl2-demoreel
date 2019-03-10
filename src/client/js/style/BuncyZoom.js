// BuncyZoom.js
'use strict';
import { css, keyframes } from 'styled-components';

export const BuncyZoomKeyframes = keyframes`
  0% { transform: scale(1, 1); }
  50% { transform: scale(1.05, 1.05); }
  100% { transform: scale(1, 1); }
`;

export const BuncyZoom = css`
  ${BuncyZoomKeyframes}
`;

export default BuncyZoom;
