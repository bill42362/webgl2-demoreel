// jest.config.js
'use strict';

module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src/client/js/'],
  setupFiles: ['<rootDir>/jest/jest.polyfill.js'],
  transform: {
    '^.+.jsx?$': 'babel-jest',
  },
  coverageDirectory: '<rootDir>/dist/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/client/js/container/',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleNameMapper: {
    '\\.(png|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  modulePathIgnorePatterns: [],
  globalSetup: '<rootDir>/jest/jest.setup.js',
  testEnvironment: '<rootDir>/jest/jsdomGlobal.environment.js',
};
