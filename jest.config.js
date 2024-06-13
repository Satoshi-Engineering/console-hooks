/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm', // for ESM support
  extensionsToTreatAsEsm: ['.ts'], // for ESM support
  transform: {}, // keep blank for ESM
  moduleFileExtensions: ['ts', 'js'],
}
