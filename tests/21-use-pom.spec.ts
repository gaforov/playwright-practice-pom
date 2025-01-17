import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});


test('Navigate to Form Page', async ({ page }) => {
    
})
