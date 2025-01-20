import { test, expect } from '@playwright/test';
import { first } from 'rxjs-compat/operator/first';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});


test('Print data from a specific column', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const smartTableRows = page.locator('nb-card', { hasText: 'Smart Table' }).locator('nb-card-body table tbody tr');
    const tableRowCount = await smartTableRows.count();

    const firstNameColumn = page.locator('//tbody/tr/td[3]')

    for (const firstName of await firstNameColumn.all()) {
        console.log(await firstName.textContent());
    }

});

test('Modify specific cell in a row 1', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Locate all rows in the table
    const rows = page.locator('//tbody/tr');
    const rowCount = await rows.count(); // Get the total number of rows
    console.log(`Total rows found: ${rowCount}`);

    const larryRow = page.getByRole('row', { name: 'Larry Bird @twitter' }).getByRole('link').first();
    await larryRow.click();


});

test('Modify specific cell in a row 2', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Get row by any text within the row
    const targetRow = page.getByRole('row', { name: '@twitter' }); // change name's value to any text within the row, it will get picked. 
    await targetRow.locator('.nb-edit').click();
    const ageInputField = page.locator('input-editor').getByPlaceholder('Age');
    await ageInputField.fill('44');
    await page.locator('.nb-checkmark').click();

    // Get the value from specific row by multiple of text within the row
    await page.getByRole('link', { name: '2' }).click();
    // const getByRowId = page.getByRole('row', {name: '11'});  // there are two rows on page 2nd with value '11', test will fail. 
    const getByRowId = page.getByRole('row', { name: 'Mark Otto @mark' }); // Be more specific, multiple cell texts, one way to solve it. 
    await getByRowId.locator('.nb-edit').click();
    const emailInputField = page.locator('input-editor').getByPlaceholder('E-mail');
    await emailInputField.fill('mark.otto@yahoo.com');
    await page.locator('.nb-checkmark').click();
    // await expect(getByRowId.locator('td').nth(5)).toHaveText('mark.otto@yahoo.com'); // by index, email is at index of 5
    await expect(getByRowId.locator('td:nth-child(6)')).toHaveText('mark.otto@yahoo.com'); // by column, email is at column 6. 

});


test('Filter table by age and validate results, including handling of non-existent ages 1', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ['20', '30', '40', '200'];

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);
        const rows = page.locator('tbody tr');
        // await expect(rows.first().locator('td').last()).toHaveText(age, { timeout: 5000 }); // this or one below, both dynamic waits work
        // await expect(rows.locator('td').nth(-1)).toHaveText(age, { timeout: 5000 });

        // Wait for either the age or 'No data found' to appear
        const expectedText = new RegExp(`\\s*(${age}|No data found)\\s*`);
        await expect(rows.locator('td').last()).toHaveText(expectedText, { timeout: 5000 });


        // await page.waitForTimeout(500); // hard-coded wait, not recommended.

        for (let row of await rows.all()) {
            if (age == '200') { // not dynamic, poor coding, strictly catches '200' only, not other non-existent ages in the database
                let ageCell = (await row.locator('td').nth(0).textContent()).trim();
                expect(ageCell).toEqual('No data found');
            } else {
                let ageCell = (await row.locator('td').nth(6).textContent()).trim();
                expect(ageCell).toBe(age);
            }
        }
    }

});


test('Filter table by age and validate results, including handling of non-existent ages', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ['20', '23', '30', '40', '70', '300', '250']; // Added dynamic ages for testing

    for (const age of ages) {
        // Fill the age filter input
        await page.getByPlaceholder('Age').fill(age);

        const rows = page.locator('tbody tr');

        await page.waitForTimeout(500); // wait for result to load before retriving text from it

        // Check the last cell of the first row for 'No data found'
        const firstRowLastCell = rows.first().locator('td').last();
        const noDataFound = (await firstRowLastCell.innerText()).trim();

        if (noDataFound === 'No data found') {
            console.log(`No data found for age ${age}`);
            continue; // Skip further validation if no data is found
        }


        if (noDataFound == 'No data found') {
            expect(noDataFound).toEqual('No data found');
        } else {
            expect(noDataFound).toBe(age);
        }

    }
});

test('Filter table by age and validate results, including handling of non-existent ages 3', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ['20', '23', '30', '40', '70', '300', '250'];

    for (const age of ages) {
        await page.getByPlaceholder('Age').fill(age);
        const rows = page.locator('tbody tr');

        await page.waitForTimeout(500); // wait for result text in the cell to load before retriving text from it
        const lastCellText = (await rows.locator('td').last().textContent()).trim();

        if (lastCellText === 'No data found') {
            console.log(`No data found for age ${age}`);
        } else {
            expect(lastCellText).toBe(age);
        }
    }
});




