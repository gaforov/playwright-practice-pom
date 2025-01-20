import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});


test.describe('Form Layouts Page', () => {
    test.describe.configure({retries: 2});  // This test group retry 2 times if test fails
    test.beforeEach(async ({ page }) => {
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
        const radioStatus = await option2.isChecked();
        expect(radioStatus).toBe(true);  // strict equality, recommended assertion. 
        // expect(radioStatus).toBeTruthy(); // This matcher checks for "truthiness," meaning it passes if the value evaluates to true in a boolean context. This includes values like non-empty strings, non-zero numbers, objects, arrays, and true itself

        await expect(option2).toBeChecked(); // another way for assertion
    });


});

test('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    await page.waitForTimeout(2000);  // add short delay before interaction
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });

    /* An idempotent operation is one that can be applied multiple times without changing the result beyond the initial application.
        For example:
        Calling .check() on a checkbox ensures the checkbox is checked, regardless of whether it was already checked or not.
        Similarly, .uncheck() ensures the checkbox is unchecked, even if it was already unchecked. */
});

test('Check all checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    await page.waitForTimeout(2000);  // add short delay before interaction, for user's UI visibility only. 

    const allCheckboxes = page.getByRole('checkbox');
    for (const checkbox of await allCheckboxes.all()) {
        await checkbox.check({ force: true });
        await expect(checkbox).toBeChecked();
    }
});

test('Uncheck all checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    await page.waitForTimeout(2000);  // add short delay before interaction, for user's UI visibility only. 

    const allCheckboxes = page.getByRole('checkbox');
    for (const checkbox of await allCheckboxes.all()) {
        await checkbox.uncheck({ force: true });
        await expect(checkbox).not.toBeChecked();
    }
});

