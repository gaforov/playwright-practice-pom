import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});


test('Handling Dialog Pop Ups', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        expect(dialog.type()).toBe('confirm');
        dialog.accept();
    });

    const smartTableRows = page.locator('nb-card', { hasText: 'Smart Table' }).locator('nb-card-body table tbody tr');
    const tableRowCount = await smartTableRows.count();
    console.log(`Number of rows in the table: ${tableRowCount}`);  // For debugging.

    for (let i = 0; i < tableRowCount; i++) {
        await smartTableRows.nth(0).locator('.nb-trash').click(); 
        console.log(`Deleted row ${i + 1}`);
    }

});

test('Delete all rows', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds for this test
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        expect(dialog.type()).toBe('confirm');
        dialog.accept();
    });

    const smartTableRows = page.locator('nb-card', { hasText: 'Smart Table' }).locator('nb-card-body table tbody tr');
    let tableRowCount = await smartTableRows.count();
    console.log(`Number of rows in the table: ${tableRowCount}`);  // For debugging.

    while (await smartTableRows.count() > 0) {
        const firstRowText = await smartTableRows.first().textContent();

        if (firstRowText?.trim() === 'No data found') {
            console.log('All rows deleted, and "No data found" message is displayed.');
            break;
        }

        await smartTableRows.first().locator('.nb-trash').click();
    }

    // Assert that the table contains only the "No data found" row
    const remainingRowText = await smartTableRows.first().textContent();
    expect(remainingRowText?.trim()).toBe('No data found'); // Verify the placeholder row

});


test('Delete all rows 2', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds for this test
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        expect(dialog.type()).toBe('confirm');
        dialog.accept();
    });

    const smartTableRows = page.locator('nb-card', { hasText: 'Smart Table' }).locator('nb-card-body table tbody tr');
    let tableRowCount = await smartTableRows.count();
    console.log(`Number of rows in the table: ${tableRowCount}`);  // For debugging.

    while (await smartTableRows.count() > 0) {
        if ((await smartTableRows.first().textContent()).includes('No data found')){
            console.log('All rows deleted, and "No data found" message is displayed.');
            break;
        }
        await smartTableRows.first().locator('.nb-trash').click();
    }

    // Assert that the table contains only the "No data found" row
    const remainingRowText = await smartTableRows.first().textContent();
    expect(remainingRowText?.trim()).toBe('No data found'); // Verify the placeholder row

});
