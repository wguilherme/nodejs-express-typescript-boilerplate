/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

const { defaults: tsjPreset } = require('ts-jest/presets')

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  // globalSetup: "<rootDir>/scripts/testSetup.js",
  // setupFilesAfterEnv: ['./jest.setup.js']
}
