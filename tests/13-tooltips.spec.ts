import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});


test('Handling Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const tooltipCardHeader = page.getByText('Tooltip Placements');
    const tooltipCard = tooltipCardHeader.locator('..');
    const topButton = tooltipCard.getByText('Top');
    const rightButton = tooltipCard.getByText('Right');
    const bottomButton = tooltipCard.getByText('Bottom');
    const leftButton = tooltipCard.getByText('Left');

    // Locate the button with the role 'button' and name 'Top'
    // const topButton = page.getByRole('button', { name: 'Top' });  // Another way of locating the element


    /*
    This approach will fail, because buttons are placed too close next to each other, and tooltip from one button will cover another button, making hover impossible.
    Solution is provided below.  
        topButton.hover();
        rightButton.hover();
        bottomButton.hover();
        leftButton.hover();
    */

    /**
 * Function to hover over a button to display its tooltip, then move the mouse cursor
 * to a neutral area to dismiss the tooltip. This approach prevents tooltip overlap,
 * ensuring that each tooltip is individually displayed and dismissed without interference.
 *
 * @param button - The Locator object representing the button to interact with.
 */
    const hoverAndMoveAway = async (button) => {
        await button.hover();             // Hover over the specified button to trigger its tooltip.
        await page.waitForTimeout(1000);  // Wait for 1 second to allow the tooltip to become fully visible.
        await page.mouse.move(0, 0);      // Move the mouse cursor to the top-left corner of the viewport to dismiss the tooltip.
        await page.waitForTimeout(500);   // Wait for 0.5 seconds to ensure the tooltip is fully dismissed before proceeding.
    };

    await hoverAndMoveAway(topButton);
    await hoverAndMoveAway(rightButton);
    await hoverAndMoveAway(bottomButton);
    await hoverAndMoveAway(leftButton);

    // Retrive a text of tooltip button
    const topButtonText = await topButton.textContent();
    console.log(topButtonText);

});