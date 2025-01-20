import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import {faker} from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
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

    await pm.onFormLayoutsPage.sumbitUsingTheGridForm('john.wick@gmail.com', 'jwick2025', 'Option 2');
    await pm.onFormLayoutsPage.submitInLineForm(randomFullName, randomEmail, true);


    // await pm.navigateTo.datePickerPage();
    // //await pm.navigationPage.datePickerPage(); this works too, if navigationPage is public, but for encapsualtion its better to use the other way -- nagivateTo() method

    // // Single Day Selection
    // await pm.onDatePickerPage.openSingleDayCalendar();
    // const singleDay = await pm.onDatePickerPage.selectDayFromTodayInCalendar(2);
    // const calendarInputField = page.getByPlaceholder('Form Picker');
    // await expect(calendarInputField).toHaveValue(singleDay);

    //  // Range Selection
    //  await pm.onDatePickerPage.openRangeCalendar();
    //  const startDay = await pm.onDatePickerPage.selectDayFromTodayInCalendar(3);
    //  const endDay = await pm.onDatePickerPage.selectDayFromTodayInCalendar(6);
    //  const rangeInputField = page.getByPlaceholder('Range Picker');
    //  await expect(rangeInputField).toHaveValue(`${startDay} - ${endDay}`);
});
