// parseXml.js
'use strict';
import { parseString } from 'xml2js';

const parseXml = ({ data }) =>
  new Promise((resolve, reject) => {
    parseString(data, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

export default parseXml;
