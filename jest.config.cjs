module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  testMatch: ['**/?(*.)test.ts?(x)'],

  transform: {
    '.+\\.css$': 'jest-transform-stub',
  },

  transformIgnorePatterns: ['node_modules/(?!@reach)'],
};
