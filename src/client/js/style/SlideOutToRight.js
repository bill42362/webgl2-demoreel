// SlideOutToRight.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SlideOutToRightKeyframes = () => keyframes`
  from  { transform: translateX(0px); }
  to { transform: translateX(100%); }
`;

const SlideOutToRight = css`
  ${SlideOutToRightKeyframes}
`;

export default SlideOutToRight;
