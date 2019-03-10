// jest.setup.js
'use strict';
const EnvConfig = require('../config.json');

module.exports = globalConfig => {
  process.env = {
    ...process.env,
    ...EnvConfig,
  };
};
