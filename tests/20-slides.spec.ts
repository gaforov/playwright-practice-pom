import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('slides', async ({ page }) => {
    const temperatureGaugeHandle = page.locator('[tabtitle="Temperature"] circle');
    // First way
    // await temperatureGaugeHandle.evaluate(node => {
    //     node.setAttribute('cx', '232.630');
    //     node.setAttribute('cy', '232.630');
    // });
    // await temperatureGaugeHandle.click();


    // Second way
    await temperatureGaugeHandle.scrollIntoViewIfNeeded();
    const box = await temperatureGaugeHandle.boundingBox();
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    const maxDistance = 170;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + maxDistance);
    await page.mouse.up();
    // await expect(temperatureGaugeHandle).toContainText('30');

});

test('set slider value', async ({ page }) => {
    const slider = page.locator('ngx-temperature-dragger').filter({ hasText: 'Celsius' });
    await slider.scrollIntoViewIfNeeded();
    await slider.click({ position: { x: 160, y: 180 } });
});

test('set slider value 2', async ({ page }) => {
    const slider = page.locator('[tabtitle="Temperature"] circle');
    // const slider = page.locator('[tabtitle="Temperature"] div ngx-temperature-dragger');
    await slider.evaluate(node => {
        node.setAttribute('ng-reflect-set-value', '30');  // not working. 
    });
});
