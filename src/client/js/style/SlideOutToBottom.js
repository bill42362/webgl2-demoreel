// SlideOutToBottom.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SlideOutToBottomKeyframes = keyframes`
  0% { transform: translateY(0%); }
  100% { transform: translateY(100%); }
`;

const SlideOutToBottom = css`
  ${SlideOutToBottomKeyframes}
`;

export default SlideOutToBottom;
