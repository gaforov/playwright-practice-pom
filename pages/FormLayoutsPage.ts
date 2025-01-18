import { Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async sumbitUsingTheGridForm(email: string, password: string, option: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });
        await usingTheGridForm.getByPlaceholder('Email').fill(email);
        await usingTheGridForm.getByPlaceholder('Password').fill(password);
        await usingTheGridForm.getByRole('radio', { name: option }).check({ force: true });
        await usingTheGridForm.getByRole('button').click();
    }

    async submitInLineForm(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
        await inlineForm.getByPlaceholder('Jane Doe').fill(name);
        await inlineForm.getByPlaceholder('Email').fill(email);
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true });
        }
        await inlineForm.getByRole('button').click();
    };
}