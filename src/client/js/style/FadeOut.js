// FadeOut.js
'use strict';
import { css, keyframes } from 'styled-components';

const FadeOutKeyframes = keyframes`
  from  { opacity: 1; }
  to  { opacity: 0; }
`;

const FadeOut = css`
  ${FadeOutKeyframes}
`;

export default FadeOut;
