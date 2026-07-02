module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  },
  moduleNameMapper: {
    '^@GeoApp/(.*)$': '<rootDir>/../../packages/$1/src/index.ts'
  }
}