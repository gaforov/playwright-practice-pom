import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});


test('Handling Dialog Pop Ups', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  page.once('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    expect(dialog.type()).toBe('confirm');
    dialog.accept();
    console.log(`Dialog type: ${dialog.type()}`);  // for debugging purposes only
  });


  // Trigger an action that opens a dialog

  // 1. Using evaluate() method 
  // await page.evaluate(() => confirm('Are you sure you want to delete?'));

  // 2. Using click() method
  await page.getByRole('table').locator('tr', {hasText: '@mdo'}).locator('.nb-trash').click();

  /* Difference between evaluate() vs click() methods and use cases:
      'page.evaluate()' executes JavaScript within the page context, allowing direct triggering of dialogs without user interaction.
      'page.click()' simulates a user's click on a button, which can trigger dialogs associated with that button.
  */

  await expect(page.locator('table tr').nth(2)).not.toHaveText('@mdo');
  console.log(`Username found on the first row: ${await page.locator('table tr').nth(2).locator('table-cell-view-mode').nth(3).textContent()}`);  // For debugging. 

});
