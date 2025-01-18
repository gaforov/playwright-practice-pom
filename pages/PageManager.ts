import {Page} from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { FormLayoutsPage } from '../pages/FormLayoutsPage';
import { DatePickerPage } from '../pages/DatePickerPage';

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datePickerPage: DatePickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);
    }


    get navigateTo() {
        return this.navigationPage;
    }

    get onFormLayoutsPage() {
        return this.formLayoutsPage;
    }

    get onDatePickerPage() {
        return this.datePickerPage;
    }
}