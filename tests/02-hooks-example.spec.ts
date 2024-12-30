import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    console.log('Global setup (e.g., launch browser).');
});

test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
    console.log('Navigating to the main page before each test.');
});

test('Example Test 1', async ({ page }) => {
    expect(await page.title()).toBe('Example Domain');
});

test('Example Test 2', async ({ page }) => {
    expect(page.url()).toContain('example.com');
});

test.afterEach(async ({ page }) => {
    console.log('Cleanup resources after each test.');
});

test.afterAll(async () => {
    console.log('Global teardown (e.g., close browser).');
});
