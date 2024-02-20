module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ["src/__tests__/testData.ts"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
};