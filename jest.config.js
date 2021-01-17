module.exports = {
    displayName: {
        name: 'Meto Station',
        color: 'blue'
    },
    preset: "jest-preset-angular",
    verbose: true,
    setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
    
    testPathIgnorePatterns: [
        "<rootDir>/src/test.ts",
        "<rootDir>/e2e/*",
        "<rootDir>/target/*",
        /*"<rootDir>/src/app/auth/*",
        "<rootDir>/src/app/devices/*",
        "<rootDir>/src/app/home/*",
        /*"<rootDir>/src/app/meteo/*",
        "<rootDir>/src/app/generic/*"*/

    ],   
    
    coverageDirectory: 'docs/reports/jest/coverage',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/app/**/*.component.ts',
        'src/app/**/*.service.ts'
    ],
    reporters: [
        "default",
        [
            "jest-html-reporter",
            {
                "outputPath": "docs/reports/jest/test.html"
            }
        ]
    ]
    ,
    globals: {
        'ts-jest': {
            astTransformers: {
                before: [
                    'jest-preset-angular/build/InlineFilesTransformer',
                    'jest-preset-angular/build/StripStylesTransformer',
                ]
            },
        }
    },
}