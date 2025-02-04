import { test, expect } from '@playwright/test';

// Set up the test environment
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('assertions 2', async ({ page }) => {
    const basicFormSubmitButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button');

    // Non-retrying assertions (Standard Expectations):
    const value = 10;
    expect(value).toEqual(10); // Synchronous: directly compares values

    const text = await basicFormSubmitButton.textContent(); // Retrieve text asynchronously
    expect(text).toEqual('Submit'); // Synchronous: verifies the fetched value

    // Auto-retrying assertions (Locator Assertions):
    await expect(basicFormSubmitButton).toHaveText('Submit'); // Asynchronous: retries until the text matches

    // Important: Always use 'await' for locator-based assertions to leverage auto-retry!


    // Soft Assertion
    await expect.soft(basicFormSubmitButton).toHaveText('Submit'); // Execution will continue even if assertion fails. 
    await basicFormSubmitButton.click();
});


/* 

DONT USE Standard ASSERTION IF POSSIBLE, USE ONE BELOW IT. toHaveText() method is preferred. It retrieves and validates text at the same time. 

const text = await basicFormSubmitButton.textContent(); 
expect(text).toEqual('Submit');

await expect(basicFormSubmitButton).toHaveText('Submit'); // USE THIS
*/