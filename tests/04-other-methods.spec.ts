import {test, expect} from '@playwright/test';

/* test.parallel(): Runs tests in parallel (useful for improving execution speed).
*/
test.describe.parallel('Parallel tests', () => {
    test('Test 1', async ({ page }) => {
        await page.goto('https://example.com');
    });

    test('Test 2', async ({ page }) => {
        await page.goto('https://example.com/contact');
    });
});

/* Tracing Methods - Start and Stop Tracing.
    Playwright provides built-in tracing tools for debugging complex test issues.
*/
test('Test 3', async ({ page, context }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto('https://example.com');
    await context.tracing.stop({ path: 'trace.zip' });
});


/* page.pause(): Pauses the test for debugging (opens Playwright Inspector). */
//await page.pause();


/* Annotations (test.fail, test.slow, test.skip, test.fixme)
    Annotations can be used to mark specific tests with additional metadata.
*/
test('This test is marked as slow', async ({ page }) => {
    test.slow(); // Indicates that this test may take longer to run
    await page.goto('https://example.com');
});

test('Expected to fail', async ({ page }) => {
    test.fail(); // Marks this test as expected to fail. (Clearly document why test.fail() is used, so it's easier to revisit and remove it when the issue is resolved.)
    expect(1 + 1).toBe(3); // This assertion will fail
});


/* test.info()
    Purpose: Provides information about the currently running test, including its status, timeout, and annotations.
    Use Case: Useful for logging or debugging during test execution.
*/
test('Log test info', async ({ page }) => {
    console.log(test.info());
    await page.goto('https://example.com');
});



/* test.setTimeout()
    Purpose: Sets the maximum time (in milliseconds) a test is allowed to run before failing.
    Use Case: Useful for extending timeouts for tests that involve long operations.
*/
test('Long-running test', async ({ page }) => {
    test.setTimeout(60000); // Set timeout to 60 seconds
    await page.goto('https://example.com');
});


/** Summary Table:
 * Method:	            Purpose:
 * test.skip()	        Skip the test.
 * test.only()	        Run only this test.
 * test.fail()	        Mark test as expected to fail.
 * test.slow()	        Mark test as slow.
 * test.step()	        Divide test into smaller steps for better reporting.
 * test.setTimeout()	Set custom timeout for a test.
 * test.info()	        Retrieve metadata about the running test.
 * test.describe()	    Group related tests.
 * page.screenshot()	Capture a screenshot of the page.
 * page.pause()	        Pause the test for debugging in Playwright Inspector.
 * context.tracing	    Record and save traces for debugging. 
 * */