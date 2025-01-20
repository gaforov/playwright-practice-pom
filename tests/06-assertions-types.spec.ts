import { test, expect } from '@playwright/test';

/* Assertions can generally be categorized as asynchronous and synchronous, based on how they operate. Here's how they differ and why this distinction exists:
const buttonText = await button.textContent(); // Fetch value asynchronously
expect(buttonText).toEqual('Submit');          // Compare it synchronously

const result = add(2, 3);
expect(result).toBe(5);     // Simple comparison
*/


test('assertions 1', async ({ page }) => {
    const value = 10;
    expect(value).toEqual(10);  // synchronous, no need to wait in the DOM to load, render, etc., instanttly availabe in memory. 
});


/* Playwright classifies assertions into four categories:
1. Auto-Retrying Assertions
        These assertions automatically retry until the expected condition is met or the timeout expires.
        Use Case: Validating dynamic content on the page.
2. Non-Retrying Assertions
        These assertions check the condition immediately and do not retry.
        Use Case: Comparing static values or results of already-resolved operations.
3. Negating Matchers
        These assertions explicitly check that something does not match the expected condition.
        Use Case: Ensuring that an element does not have a specific property or state.
4. Soft Assertions
        These assertions do not stop the test when they fail but collect failures to report at the end.
        Use Case: Useful when you want to validate multiple conditions in a single test without stopping at the first failure.
*/

// Examples for each assertion type: 

test.fixme('Assertion types', async ({ page }) => {

    // 1. Auto-Retrying Assertions: Waits until the input field has the expected value
    await expect(page.locator('input[type="text"]')).toHaveValue('Expected Value');


    // 2. Non-Retrying Assertions
    const textContent = await page.locator('button').textContent();
    expect(textContent).toBe('Submit'); // No retrying; this is a direct value comparison


    // 3. Negating Matchers
    await expect(page.locator('button')).not.toBeVisible();  // Ensures the button is not visible
    await expect(page.locator('input[type="text"]')).not.toHaveValue('Unexpected Value');  // Ensures the text input does not contain a specific value


    // 4. Soft Assertions
    await expect.soft(page.locator('h1')).toHaveText('Welcome');  // Soft mode enabled
    await expect.soft(page.locator('button')).toBeVisible();      // Soft mode enabled

    // Test continues even if the above assertions fail
    console.log('Test continues with soft assertions.');

});

