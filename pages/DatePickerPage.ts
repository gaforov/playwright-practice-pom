import { Page, expect } from '@playwright/test';
import { HelperBase } from './HelperBase';

export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async openSingleDayCalendar() {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
    }

    async openRangeCalendar() {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
    }

    async selectDayFromTodayInCalendar(numberOfDaysFromToday: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDay = date.getDate().toString();
        const expectedMonthShort = date.toLocaleDateString('En-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleDateString('En-US', { month: 'long' });
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;

        let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode button').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

        while (!currentMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('button.next-month').click();
            currentMonthAndYear = await this.page.locator('nb-calendar-view-mode button').textContent();
        }
        await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click();
        return dateToAssert;
    }
}