import { test } from '@playwright/test';

test.describe('Test Suite 1', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });


    // Using more user-friendly locators a.k.a "GetBy Locators"
    test('Test 1', async ({page}) => {
        await page.getByRole('textbox', {name: 'Email'}).first().click();
        await page.getByPlaceholder('Jane Doe').click();
    });

    test('Test 2', async ({page}) => {
        await page.getByTitle('IoT Dashboard').click();
        
    });

    test('Test 3', async ({page}) => {
        await page.getByTestId('grid-sign-in-button').click();
        
    });

});
