import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});


test('Navigate to Form Page', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.formLayoutsPage();
    await pm.navigateTo.datePickerPage();
    await pm.navigateTo.smartTablePage();
    await pm.navigateTo.toastrPage();
    await pm.navigateTo.tooltipPage();
});

test('parameterized method', async ({ page }) => {
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(100)}@gmail.com`;

    await pm.navigateTo.formLayoutsPage();

    // Using faker library to generate random names and emails each time the test runs. 
    await pm.onFormLayoutsPage.sumbitUsingTheGridForm('john.wick@gmail.com', 'jwick2025', 'Option 2');

    await pm.helperBase.waitForNumberOfSeconds(2); // Wait for 2 seconds before filling the inline form
    await pm.onFormLayoutsPage.submitInLineForm(randomFullName, randomEmail, true);

    // Comment DatePicker section below, if you want to test random name and email generator

    await pm.navigateTo.datePickerPage();
    //await pm.navigationPage.datePickerPage(); this works too, if navigationPage is public, but for encapsualtion its better to use the other way -- nagivateTo() method

    // Single Day Selection
    await pm.onDatePickerPage.openSingleDayCalendar();
    const singleDay = await pm.onDatePickerPage.selectDayFromTodayInCalendar(2);
    const calendarInputField = page.getByPlaceholder('Form Picker');
    await expect(calendarInputField).toHaveValue(singleDay);

    // Range Selection
    await pm.onDatePickerPage.openRangeCalendar();
    const startDay = await pm.onDatePickerPage.selectDayFromTodayInCalendar(3);
    const endDay = await pm.onDatePickerPage.selectDayFromTodayInCalendar(6);
    const rangeInputField = page.getByPlaceholder('Range Picker');
    await expect(rangeInputField).toHaveValue(`${startDay} - ${endDay}`);
});

// Log Which Browser Is Actually Running
test('check browser', async ({ page, browserName }) => {
    console.log('Running on browser:', browserName);
    await page.goto('https://example.com');
});

// Check Which Browser Version Is Running
test('Print browser version', async ({ browser }) => {
    const version = browser.version();
    console.log('Browser version:', version);
  });
  
