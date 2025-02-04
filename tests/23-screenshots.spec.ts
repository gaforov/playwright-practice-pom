import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { faker } from '@faker-js/faker';
import { HelperBase } from '../pages/HelperBase';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('take screenshots', async ({ page }) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(100)}@gmail.com`;

    await pm.navigateTo.formLayoutsPage();

    // Using faker library to generate random names and emails each time the test runs. 
    await pm.onFormLayoutsPage.sumbitUsingTheGridForm('john.wick@gmail.com', 'jwick2025', 'Option 1');

    await page.waitForLoadState('networkidle'); // Wait dynamically for full page load before taking a screenshot
    await page.screenshot({ path: 'screenshots/formLayoutsPage.png' });

    // Take screenshot of a specific area of the page
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
    await basicForm.screenshot({ path: 'screenshots/basicForm.png' });
});
