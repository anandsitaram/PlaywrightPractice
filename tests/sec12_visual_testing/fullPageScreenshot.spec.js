import { test } from "@playwright/test";
 
test("Full Page ScreenShot", async ({ browser }) => {
    const product = "Rocco Gym Tank";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(" https://magento.softwaretestingboard.com/");
    await page.waitForLoadState("networkidle");
    await page.locator("//span[text()='Men']/ancestor::a").hover();
    await page.getByText("Tops").last().hover();
    await page.getByRole('menuitem', { name: 'Tanks' }).click();
    await page.waitForLoadState("networkidle");
    await page.locator("strong[class*='product name'] [class='product-item-link']")
    .filter({hasText:product}).click()
    await page.waitForLoadState("networkidle");
    await page.screenshot({path:'tests/sec12_visual_testing/fullpageScreehsot.png'})

    
});