// media.js
'use strict';
import { css } from 'styled-components';

const SIZE = {
  tablet: 1023,
  mobile: 767,
};

const media = Object.keys(SIZE).reduce((acc, key) => {
  return {
    ...acc,
    [key]: (...args) => css`
      @media (max-width: ${SIZE[key]}px) {
        ${css(...args)}
      }
    `,
  };
}, {});

export default media;
