// parseM3u8.js
'use strict';
// const m3u8Parser = require('m3u8-parser');
import { Parser } from 'm3u8-parser';

const parseM3u8 = ({ data }) =>
  new Promise((resolve, reject) => {
    try {
      const parser = new Parser();
      parser.push(data);
      parser.end();
      resolve(parser.manifest);
    } catch (error) {
      reject(error);
    }
  });

export default parseM3u8;
