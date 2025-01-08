import { test, expect } from '@playwright/test';

// Set up the test environment
test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
});

test('auto-waiting for data to load', async ({ page }) => {
    const ajaxMessage = page.locator('.bg-success');
    await ajaxMessage.click();
    console.log(await ajaxMessage.innerText());  // print for debugging
});

test('verify loaded text', async ({ page }) => {
    const ajaxMessage = page.locator('.bg-success');
    const text = await ajaxMessage.textContent();
    expect(text).toEqual('Data loaded with AJAX get request.');
});

test('verify loaded text 2', async ({ page }) => {
    const ajaxMessage = page.locator('.bg-success');
    await expect(ajaxMessage).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 }); // Data loads in 15 seconds, toHveText() default timeout is 5 seconds, manually increase the timeout. (Ex: 20 seconds).
});


test('alternative waits', async ({ page }) => {
    const ajaxMessage = page.locator('.bg-success');

    // 1. wait for element
    // await page.waitForSelector('.bg-success');


    // 2. wait for response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata');
    
    // improved version of wait for response:
    // await page.waitForResponse(response => {
    //     return response.url() === 'http://uitestingplayground.com/ajaxdata' && response.status() === 200;
    // });


    // 3. wait for network calls to be completed ('Not Recommended')
    await page.waitForLoadState('networkidle');

    // Use this assertion OR toHaveText() assertion. toHaveText() recommended by playwright. 
    // const text = await ajaxMessage.textContent();
    // expect(text).toEqual('Data loaded with AJAX get request.');

    await expect(ajaxMessage).toHaveText('Data loaded with AJAX get request.');
});


/* Default Timeouts in Playwright:
Global: no timeout
Test: 30000ms (30sec)
Action: click(), fill(), etc. no timeout
Navigation: page.goto() No timeout
Expect: 5000ms (5sec)
*/
test('test-level auto-wait is 30 seconds', async ({ page }) => {
    const ajaxMessage = page.locator('.bg-success');
    await ajaxMessage.click({timeout: 16000}); // Action timeout is set to 5 seconds in config, so this test will fail, but we can overddire timeout. 
});