// FadeIn.js
'use strict';
import { css, keyframes } from 'styled-components';

const FadeInKeyframes = keyframes`
  from  { opacity: 0; }
  to  { opacity: 1; }
`;

const FadeIn = css`
  ${FadeInKeyframes}
`;

export default FadeIn;
