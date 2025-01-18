import { Locator, Page } from "@playwright/test";


export class NavigationPage {
    readonly page: Page;
    readonly formLayoutsMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formLayoutsMenuItem = this.page.getByText('Form Layouts');
        this.datePickerMenuItem = this.page.getByText('Datepicker');
        this.smartTableMenuItem = this.page.getByText('Smart Table');
        this.toastrMenuItem = this.page.getByText('Toastr');
        this.tooltipMenuItem = this.page.getByText('Tooltip');
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.formLayoutsMenuItem.click();
    }
    
    async datePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.waitForTimeout(1000);        // debugging line for testing collapsible menu
        await this.datePickerMenuItem.click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenuItem.click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.toastrMenuItem.click();
    }
    
    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const menuItemLocator = this.page.getByTitle(groupItemTitle);
        const isExpanded = await menuItemLocator.getAttribute('aria-expanded');
        if (isExpanded == 'false') {
            await menuItemLocator.click();
        }
    }
}