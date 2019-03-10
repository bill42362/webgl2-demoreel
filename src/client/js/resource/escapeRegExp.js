// escapeRegExp.js
'use strict';

// https://stackoverflow.com/a/6969486/2605764
const escapeRegExp = ({ string }) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default escapeRegExp;
