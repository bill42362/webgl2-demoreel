// SlideInFromLeft.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SlideInFromLeftKeyframes = () => keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0%); }
`;

const SlideInFromLeft = css`
  ${SlideInFromLeftKeyframes}
`;

export default SlideInFromLeft;
