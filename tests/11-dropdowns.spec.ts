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

    // Validate all options, expand then check the texts --> 'Light', 'Dark', 'Cosmic', 'Corporate'
    const dropDownMenu = page.locator('ngx-header nb-select');
    const optionList = page.getByRole('list').locator('nb-option');
    await dropDownMenu.click();  // click to expand options
    await expect(optionList).toHaveText(Object.keys(colors));

    const header = page.locator('nb-layout-header');

    // Validate background color for each option/theme. 
    for (const [theme, expectedColor] of Object.entries(colors)) {
        await optionList.filter({ hasText: theme }).click();
        await expect(header).toHaveCSS('background-color', expectedColor);
        if (theme != 'Corporate') {
            await page.waitForTimeout(500)
            await dropDownMenu.click();
        }
    }
});
