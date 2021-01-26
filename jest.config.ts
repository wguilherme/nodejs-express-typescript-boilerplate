/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest/utils'
const { defaults: tsjPreset } = require('ts-jest/presets')

export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: 'ts-jest',
  testEnvironment: "node"
};
