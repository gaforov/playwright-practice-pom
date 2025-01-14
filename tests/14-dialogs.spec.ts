import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:4200/');
// });


// test('Handling Tooltips', async ({ page }) => {
//     await page.getByText('Modal & Overlays').click();
//     await page.getByText('Tooltip').click();
// });


test('Handle JavaScript Alerts, Confirms, and Prompts', async ({ page }) => {
  // Navigate to the target page
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Register a 'dialog' event listener to handle JavaScript dialogs
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    switch (dialog.type()) {
      case 'alert':
        await dialog.accept();
        break;
      case 'confirm':
        await dialog.accept();
        break;
      case 'prompt':
        await dialog.accept('Sample input');
        break;
      default:
        throw new Error(`Unexpected dialog type: ${dialog.type()}`);
    }
  });

  // Interact with the 'Click for JS Alert' button
  await page.click('text=Click for JS Alert');
  // Verify the result text
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

  // Interact with the 'Click for JS Confirm' button
  await page.click('text=Click for JS Confirm');
  // Verify the result text
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');

  // Interact with the 'Click for JS Prompt' button
  await page.click('text=Click for JS Prompt');
  // Verify the result text includes the input provided
  await expect(page.locator('#result')).toHaveText('You entered: Sample input');
});


test('Handle JavaScript Alert', async ({ page }) => {
  // Navigate to the target page
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Register a 'dialog' event listener to handle the alert
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });

  // Click the button to trigger the alert dialog
  await page.click('text=Click for JS Alert');

  // Verify the result text
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});

