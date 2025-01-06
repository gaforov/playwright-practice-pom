import { test, expect } from '@playwright/test';

// Set up the test environment
test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
});

test('auto-waiting for ajax', async ({page}) => {
    const ajaxMessage = page.locator('.bg-success');
    await ajaxMessage.click();
    console.log(await ajaxMessage.innerText());
});

