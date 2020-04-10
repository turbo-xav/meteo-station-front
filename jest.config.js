const { defaults } = require('jest-config');

module.exports = {
  preset: "jest-preset-angular",

  displayName: {
    name: 'Meto Station',
    color: 'blue'
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupJest.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        "outputPath": "docs/reports/test.html"
      }
    ]
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src/test.ts",
    "<rootDir>/e2e/*",
    "<rootDir>/target/*"
  ],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.component.ts',
    'src/app/**/*.service.ts'
  ]
}