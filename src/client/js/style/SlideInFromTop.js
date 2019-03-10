// SlideInFromTop.js
import { css, keyframes } from 'styled-components';

const SlideInFromTopKeyframes = keyframes`
  from { transform: translateY(-100%);}
  to {transform: translateY(0%);}
`;

const SlideInFromTop = css`
  ${SlideInFromTopKeyframes}
`;

export default SlideInFromTop;
