// Delay.js
'use strict';

export const Delay = function(msec) {
  this.msec = msec || 500;
  this.timeout = null;
  this.setMsec = msec => {
    this.msec = msec;
    return this;
  };
  this.promise = msec =>
    new Promise(resolve => {
      this.timeout = setTimeout(() => resolve(this), msec || this.msec);
    });
};

export default Delay;
