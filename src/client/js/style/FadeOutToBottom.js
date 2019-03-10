// FadeOutToBottom.js
'use strict';
import { css, keyframes } from 'styled-components';

export const FadeOutToBottomKeyframes = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
  }
`;

const FadeOutToBottom = css`
  ${FadeOutToBottomKeyframes}
`;

export default FadeOutToBottom;
