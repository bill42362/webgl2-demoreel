// formatNumber.js
// Ref. https://stackoverflow.com/a/17633552
'use strict';

const RANGES = [
  { divider: 1e18, suffix: 'E' },
  { divider: 1e15, suffix: 'P' },
  { divider: 1e12, suffix: 'T' },
  { divider: 1e9, suffix: 'G' },
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'k' },
];

const formatNumber = num => {
  if (num < 0) {
    return `-${formatNumber(-num)}`;
  }

  for (let i = 0; i < RANGES.length; i++) {
    if (num >= RANGES[i].divider) {
      return (num / RANGES[i].divider).toFixed(1).toString() + RANGES[i].suffix;
    }
  }

  return num.toString();
};

export default formatNumber;
