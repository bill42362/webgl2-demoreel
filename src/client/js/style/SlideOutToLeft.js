// SlideOutToLeft.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SlideOutToLeftKeyframes = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const SlideOutToLeft = css`
  ${SlideOutToLeftKeyframes}
`;

export default SlideOutToLeft;
