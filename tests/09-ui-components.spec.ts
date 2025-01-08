import { test, expect } from '@playwright/test';

test.describe('Form Layouts Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByPlaceholder('Email');
        await page.waitForTimeout(1000);   // adding time for UI to see visually
        await usingTheGridEmailInput.fill('test@gmail.com')
        await page.waitForTimeout(1000);   // adding time for UI to see visually
        await usingTheGridEmailInput.clear();
        await page.waitForTimeout(1000);   // adding time for UI to see visually
        // await usingTheGridEmailInput.pressSequentially('Hello World!');
        await usingTheGridEmailInput.pressSequentially('Hello World!', { delay: 100 });  // with added delay

        // generic assertion
        const emailInputValue = await usingTheGridEmailInput.inputValue();
        expect(emailInputValue).toBe('Hello World!');

        // locator assertion
        expect(usingTheGridEmailInput).toHaveValue('Hello World!');
    });

    test('radio buttons', async ({ page }) => {
        const usingTheGridPage = page.locator('nb-card', { hasText: 'Using the Grid' });
        const option1 = usingTheGridPage.getByText('Option 1');
        // await label.click();  // click() works too, but not recommended. because if radio button or checkbox is already cheked, it will uncheck it. it mimics mouse click. 
        await option1.check();

        // const option1 = usingTheGridPage.getByLabel('Option 1');
        // await option1.check({ force: true });  // using getByLabel() with check() won't work because of the class="native-input visually-hidden" in the web element. Only when force is true, it will work. 

        await page.waitForTimeout(1000);    // adding time for UI visibility
        const option2 = usingTheGridPage.getByRole('radio', { name: 'Option 2' });
        await option2.check({ force: true });  // using getByLabel() with check() won't work because of the class="native-input visually-hidden" in the web element. Only when force is true, it will work. 

        // const option2 = usingTheGridPage.getByText('Option 2');  
        // await option2.check();  // when using getByText() no need to use check({ force: true }) because it will work without it.

    });

    test('radio buttons clean version', async ({ page }) => {
        const usingTheGridPage = page.locator('nb-card', { hasText: 'Using the Grid' });

        const option1 = usingTheGridPage.getByText('Option 1');
        await option1.check();

        await page.waitForTimeout(1000);    // adding time for UI visibility

        const option2 = usingTheGridPage.getByText('Option 2');
        await option2.check();  // when using getByText() no need to use check({ force: true }) because it will work without it.
        option2.isChecked();
    });


});