import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});


test('dropdowns', async ({ page }) => {
    // const dropDownMenu = page.locator('nb-select:has-text("Light")');  // This locator works too, but getBy Locators preferred.
    // const dropDownMenu = page.getByRole('button', { name: 'Light' }); // This locator wont work if you try to re-select from different option such as if Dark is default and you try to reselect, 'Light' wont be found. 
    const dropDownMenu = page.locator('ngx-header nb-select'); // This locator is more dynamic, selects dropdown regardless of which option is displayed. 
    await dropDownMenu.click();

    //                       parent locator       child-locator
    const optionList = page.getByRole('list').locator('nb-option');

    // Another way, locate by css locator -- parent locator space and then foloowed by child
    // const optionList = page.locator('nb-option-list nb-option')

    // validate dropdown menu selections
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

    // select an option from dropdown
    await optionList.filter({ hasText: 'Cosmic' }).click();

    // validate background color of selected option
    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');


    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    // Approach 1
    // for (const color in colors) {
    //     await dropDownMenu.click();
    //     await optionList.filter({ hasText: color }).click();
    //     await expect(header).toHaveCSS('background-color', colors[color]);
    // }

    // Approach 2
    for (const [theme, expectedColor] of Object.entries(colors)) {
        await page.waitForTimeout(500);
        await dropDownMenu.click();
        await optionList.filter({ hasText: theme }).click();
        await expect(header).toHaveCSS('background-color', expectedColor);
    }

});
