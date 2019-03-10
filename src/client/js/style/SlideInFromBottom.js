// SlideInFromBottom.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SlideInFromBottomKeyframes = () => keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0%); }
`;

const SlideInFromBottom = css`
  ${SlideInFromBottomKeyframes}
`;

export default SlideInFromBottom;
