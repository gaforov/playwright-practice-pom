import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the environment from command-line args or default to 'qa'
const ENV = process.env.TEST_ENV || 'qa'; 

// Define environment-specific URLs
const baseUrls = {
  dev: process.env.DEV_BASE_URL,
  qa: process.env.QA_BASE_URL,
  staging: process.env.STAGING_BASE_URL,
  prod: process.env.PROD_BASE_URL
};

// Set the correct base URL based on the environment
const baseURL = baseUrls[ENV];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // timeout: 40000,  // you can customize auto-wait time here, by dafault its 30 seconds. 
  // globalTimeout: 60000, // by default, there is no global timeout
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // When 'undefined' will select number of workers dynamically based on CPU cores.
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // actionTimeout: 5000,      // by default, no timeout
    // navigationTimeout: 5000,  // by default, no timeout
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,
    browserName: 'chromium',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // deviceScaleFactor: 2,  // Higher DPI for better resolution
    // viewport: { width: 1920, height: 1080 },  // default viewport size seto to HD
    video: {
      mode: 'retain-on-failure', // record videos for failing tests
      size: { width: 1920, height: 1080 }, // viewport size
    }


  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // fullyParallel: true, // Optional: run tests in parallel for this browser
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      // fullyParallel: true, // Optional: run tests in parallel for this browser
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'], // <- will fallback to 'Desktop Chrome' if not defined
        channel: 'msedge',          // <- tells Playwright to use Microsoft Edge
      },
      // fullyParallel: true, // Optional: run tests in parallel for this browser
    },

    // Alternative to .env file for handling testing environments. 
    // {
    //   name: 'dev',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4200/'  // replace with dev URL
    //   },
    // },
    // {
    //   name: 'qa',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4200' // replace with qa URL
    //   },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
