// numberWithCommas.js
'use strict';

// https://stackoverflow.com/a/2901298
const numberWithCommas = ({ number }) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default numberWithCommas;
