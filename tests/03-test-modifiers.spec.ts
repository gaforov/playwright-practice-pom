import { test, expect } from "@playwright/test";

/** test.skip()
    Purpose: Skips the execution of the test.
    When to Use:
       - To ignore tests that are not ready or not relevant for the current run.
       - To conditionally skip a test based on runtime conditions.
 */
test.skip('This test will not run', async ({ page }) => {
    await page.goto('https://example.com');
});


/** test.fixme()
    Purpose: Marks the test as a "work-in-progress." Automatically skips the test.
    When to Use:
       - To indicate tests that are known to be broken or incomplete.
 */
test.fixme('This test is not implemented yet', async ({ page }) => {
    // Skipped
});


/** test.only()
    Purpose: Runs only this test or test group, ignoring all others.
    When to Use:
       - To focus on a single test or a group of tests during development/debugging.
 */
// test.only('This is the only test that will run', async ({ page }) => {
//     await page.goto('https://example.com');
// });


/* test.describe.skip()
    Purpose: Skips an entire group of tests.
    When to Use:
       - To exclude a group of tests temporarily or based on conditions. 
*/
test.describe.skip('Skipped group of tests', () => {
    test('Test 1', async ({ page }) => {
        // Will not run
    });

    test('Test 2', async ({ page }) => {
        // Will not run
    });
});


/* test.describe.only()
    Purpose: Runs only this group of tests, ignoring all others.
    When to Use:
       - To focus on a specific group of tests during debugging or development.
*/
// test.describe.only('Focused group of tests', () => {
//     test('Test 1', async ({ page }) => {
//         // This will run
//     });

//     test('Test 2', async ({ page }) => {
//         // This will also run
//     });
// });


/* test.use()
    Purpose: Overrides or provides custom fixtures for a specific test or group of tests.
    When to Use:
       - To customize the browser, context, or other resources for a test.
*/
// test.use({ browserName: 'firefox' }); // comment this line to default to chromium

test('Runs only on Firefox', async ({ page }) => {
    await page.goto('https://example.com');
});


/* test.step()
    Purpose: Divides a test into smaller steps to provide better clarity and debugging.
    When to Use:
       - To improve test reports by logging the progression of a test.
*/
test('Test with steps', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
        await page.goto('https://example.com');
    });
    await test.step('Check title', async () => {
        expect(await page.title()).toBe('Example Domain');
    });
});



/** Why Test Modifiers?
 * - Dynamic Behavior: Modifiers allow conditional execution, skipping, or focusing on tests at runtime.
 * - Improved Debugging: Modifiers like test.only() and test.step() help isolate or clarify issues during development.
 * - Clear Documentation: Marking tests as test.skip() or test.fixme() makes test reports more informative and easier to understand.
 * 
 * Test Modifiers Overview:
 * Test modifiers are methods that adjust (modify) the behavior of a test. They enable dynamic control by allowing tests
 * to be skipped, marked as exclusive, or flagged as work-in-progress. These tools provide flexibility in managing test execution.
 */