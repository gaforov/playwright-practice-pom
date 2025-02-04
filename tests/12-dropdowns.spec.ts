import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('dropdowns', async ({ page }) => {
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    };

    const dropDownMenu = page.locator('ngx-header nb-select');
    const optionList = page.getByRole('list').locator('nb-option');
    const header = page.locator('nb-layout-header');

    for (const [theme, expectedColor] of Object.entries(colors)) {
        await dropDownMenu.click(); // Ensure the dropdown is expanded
        await optionList.filter({ hasText: theme }).click(); // Select the current theme
        await expect(header).toHaveCSS('background-color', expectedColor); // Validate the background color
        await page.waitForTimeout(500); // Optional: Wait for UI transitions
    }
});
