import {Page} from '@playwright/test';

export class HelperBase {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForNumberOfSeconds(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }
}