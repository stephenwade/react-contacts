module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  testMatch: ['**/?(*.)test.ts?(x)'],

  collectCoverage: true,

  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  coverageProvider: 'v8',

  transform: {
    '.+\\.css$': 'jest-transform-stub',
  },
};
