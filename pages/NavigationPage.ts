import { Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";


export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.getByText('Form Layouts').click();
    }
    
    async datePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.waitForTimeout(1000);            // debugging line
        await this.waitForNumberOfSeconds(1);
        await this.page.getByText('Datepicker').click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.page.getByText('Smart Table').click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.getByText('Toastr').click();
    }
    
    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.getByText('Tooltip').click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const menuItemLocator = this.page.getByTitle(groupItemTitle);
        const isExpanded = await menuItemLocator.getAttribute('aria-expanded');
        if (isExpanded == 'false') {
            await menuItemLocator.click();
        }
    }
}