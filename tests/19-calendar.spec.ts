import {test, expect} from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});



test('Handling Calendar', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    calendarInputField.click();

    // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click();
    // await page.locator('nb-calendar-day-cell:not(.bounding-month)').getByText('1', {exact: true}).click();  // this will select current date (today's date) as well. Current date has 'today' class in the DOM.
    // await page.locator('.day-cell.today').click();  // Selects today's date
    await page.locator('.day-cell:not(.bounding-month)').getByText('1', { exact: true }).click();

    // await expect(calendarInputField).toHaveValue('Jan 1, 2025')

    console.log(await calendarInputField.inputValue());  // How to retrieve input value

});

test('Handling Calendar enhanced day picker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    let date = new Date();
    date.setDate(date.getDate() + 90);
    const expectedDay = date.getDate().toString();
    const expectedMonthShort = date.toLocaleDateString('En-US', { month: 'short' });
    const expectedMonthLong = date.toLocaleDateString('En-US', { month: 'long' });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;

    let currentMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    while (!currentMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('button.next-month').click();
        currentMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent();
        // await page.waitForTimeout(500); 
    }

    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click();
    await expect(calendarInputField).toHaveValue(dateToAssert)

});

test('Handling Calendar enhanced day picker 2', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);
    const targetDay = targetDate.getDate().toString();
    const targetMonthShort = targetDate.toLocaleDateString('en-US', { month: 'short' });
    const targetMonthLong = targetDate.toLocaleDateString('en-US', { month: 'long' });
    const targetYear = targetDate.getFullYear();
    const dateToAssert = `${targetMonthShort} ${targetDay}, ${targetYear}`;

    const currentMonthAndYearLocator = page.locator('nb-calendar-view-mode button');

    while (true) {
        const currentMonthAndYear = (await currentMonthAndYearLocator.textContent()).trim();
        const expectedMonthAndYear = `${targetMonthLong} ${targetYear}`;

        if (currentMonthAndYear === expectedMonthAndYear) {
            break;
        }

        await page.locator('button.next-month').click();
        await page.waitForTimeout(500); 
    }

    await page.locator('.day-cell:not(.bounding-month)').getByText(targetDay, { exact: true }).click();
    await expect(calendarInputField).toHaveValue(dateToAssert);
});
