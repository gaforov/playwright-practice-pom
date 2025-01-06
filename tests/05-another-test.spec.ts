import { test, expect } from '@playwright/test';

test.describe('Test Suite 2', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });


    // Using more user-friendly locators a.k.a "GetBy Locators"
    test('Test 2.1', async ({page}) => {
        await page.getByLabel('Email address').fill('user@test.com');
        await page.locator('#exampleInputPassword1').fill('Welcome123');
        await page.locator('button[status="danger"]').click();

    });

    test('Test 2.2', async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
        const emailField = basicForm.getByRole('textbox', {name: 'Email'});

        await emailField.fill('user@test.com');
        await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123');
        await basicForm.getByRole('button').click();

        await expect(emailField).toHaveValue('user@test.com');  // This assertion using await keyword

    });

    test('Test 2.3', async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
        const buttonText = await basicForm.locator('button').textContent();

        expect(buttonText).toEqual('Submit');

    });

    test('Test 2.4', async ({page}) => {
        // Get all text values
        const usingTheGridAllRadioButtons = await page.locator('nb-radio').allTextContents();
        for (const element of usingTheGridAllRadioButtons) {
            console.log(element);
        }
        expect(usingTheGridAllRadioButtons).toContain('Option 1');

        // Get input value
        const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
        const emailField = basicForm.getByRole('textbox', {name: 'Email'});
        await emailField.fill('test@gmail.com');
        const emailInputValue = await emailField.inputValue();
        expect(emailInputValue).toEqual('test@gmail.com');
    });


});