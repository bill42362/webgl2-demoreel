// helper.js
'use strict';

exports.trimReducer = text => text.replace(/^.*\//, '');
exports.relativePath = text => text.replace(/^.*swag-webapp/, '');
