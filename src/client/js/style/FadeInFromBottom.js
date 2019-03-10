// FadeInFromBottom.js
'use strict';
import { css, keyframes } from 'styled-components';

export const FadeInFromBottomKeyframes = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% { transform: translateY(0px); }
`;

const FadeInFromBottom = css`
  ${FadeInFromBottomKeyframes}
`;

export default FadeInFromBottom;
