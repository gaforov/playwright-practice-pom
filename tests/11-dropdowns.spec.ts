import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the target page before each test
    await page.goto('http://localhost:4200/');
});

test('dropdowns', async ({ page }) => {
    // Define the expected background colors for each theme
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    };

    // Locate the dropdown menu and click to expand it
    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    // Locate the list of options within the dropdown
    const optionList = page.locator('nb-option-list nb-option');

    // Validate that the dropdown contains the expected options
    await expect(optionList).toHaveText(Object.keys(colors)); // Verifying text: 'Light', 'Dark', 'Cosmic', 'Corporate'

    // Locate the header element whose background color will change
    const header = page.locator('nb-layout-header');

    // Iterate through each theme and validate the background color
    for (const [theme, expectedColor] of Object.entries(colors)) {
        // Ensure the dropdown is expanded

        // Select the current theme from the dropdown
        await optionList.filter({ hasText: theme }).click({ timeout: 10000 });

        // Validate the background color of the header
        await expect(header).toHaveCSS('background-color', expectedColor);
        if (theme != 'Corporate') {
            await dropDownMenu.click();
        }
    }
});
