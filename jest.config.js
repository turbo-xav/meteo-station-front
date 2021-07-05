module.exports = {
  displayName: {
    name: 'Meto Station',
    color: 'blue'
  },
  preset: 'jest-preset-angular',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],

  modulePaths: ['<rootDir>'],

  testPathIgnorePatterns: [
    '<rootDir>/src/test.ts',
    '<rootDir>/e2e/*',
    '<rootDir>/target/*'
    /*"<rootDir>/src/app/app.component.*",
        "<rootDir>/src/app/auth/*",
        "<rootDir>/src/app/devices/*",
        "<rootDir>/src/app/home/*",
        "<rootDir>/src/app/meteo/stats/*",
        "<rootDir>/src/app/meteo/forecast/*",
        "<rootDir>/src/app/meteo/station/*",
        "<rootDir>/src/app/meteo/stats/graph/*",
        "<rootDir>/src/app/generic/*"*/
  ],

  coverageDirectory: 'docs/reports/jest/coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.component.ts', 'src/app/**/*.service.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: 'docs/reports/jest/test.html'
      }
    ]
  ],
  globals: {
    'ts-jest': {
      astTransformers: {
        before: []
      }
    }
  }
};
