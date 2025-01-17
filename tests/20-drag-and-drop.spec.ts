import {test, expect} from '@playwright/test';

test('drag and drop with iframe', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

    // First approach -- dragTo() method
    // await frame.getByRole('listitem').locator('h5', {hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash'));
    await frame.locator('li', {hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash'));

    // Second approach -- mouse
    await frame.locator('li', {hasText: 'High Tatras 3'}).hover();
    await page.mouse.down(); // hold
    await frame.locator('#trash').hover(); // hover while holding
    await page.mouse.up(); // release 

    await expect(frame.locator('#trash h5')).toHaveText(['High Tatras 2', 'High Tatras 3']);
    
    // for debugging only -- print 
    const imageNames = await frame.locator('#trash h5').all();
    for (const image of imageNames) {
        console.log(await image.textContent());
    }

})
