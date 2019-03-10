// SlideInFromRight.js
'use strict';
import { css, keyframes } from 'styled-components';

export const SlideInFromRightKeyframes = () => keyframes`
  from  { transform: translateX(100%); }
  to { transform: translateX(0px); }
`;

const SlideInFromRight = css`
  ${SlideInFromRightKeyframes}
`;

export default SlideInFromRight;
