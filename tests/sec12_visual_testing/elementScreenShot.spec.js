import { test,expect} from "@playwright/test";
 
test("elements ScreenShot", async ({ browser }) => {
    const product = "Rocco Gym Tank";
    const qty="4"
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
    await expect(page.locator("h1[class='page-title'] span")).toHaveText(product);
 
    expect(
        await page
            .locator("div[class='product-info-price'] >>span[class='price']")
            .textContent()
    ).toBeTruthy();
    await page.locator("div[option-label='XS']").click();
 
    await page.locator("div[option-label='Blue']").click();
 
    await page.locator("#qty").fill(qty);
 
    await page.locator("#product-addtocart-button").click();
 
    //Elements Screenshots
    await page.locator("div[option-label='XS']").screenshot({path:'tests/sec12_visual_testing/element_size.png'})
 
    await page.locator("div[option-label='Blue']").screenshot({path:'tests/sec12_visual_testing/element_color.png'})
 
    await page.locator("#qty").screenshot({path:'tests/sec12_visual_testing/element_qty.png'})
 
    
});