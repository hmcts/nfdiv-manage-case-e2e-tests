import { CommonConfig, ProjectsConfig } from '@hmcts/playwright-common';
import { defineConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    ...CommonConfig.recommended,
    testDir: './e2e',

    projects: [
        {
            name: 'setup',
            testMatch: /global\.setup\.ts/,
        },
        {
            name: 'teardown',
            testMatch: /global\.teardown\.ts/,
        },
        {
            ...ProjectsConfig.chrome,
            dependencies: ['setup'],
        },
        {
            ...ProjectsConfig.edge,
            dependencies: ['setup'],
        },
        {
            ...ProjectsConfig.firefox,
            dependencies: ['setup'],
        },
        {
            ...ProjectsConfig.webkit,
            dependencies: ['setup'],
        },
    ],
});
