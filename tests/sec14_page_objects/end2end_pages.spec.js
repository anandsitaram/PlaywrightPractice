import { test, expect } from "@playwright/test";
const {HomePage}= require('./HomePage')
test("New User", async ({ browser }) => {
    const product = "Rocco Gym Tank";
    const qty = "3";
    const context = await browser.newContext();
    const page = await context.newPage();
    const homePage=new HomePage(page);
    await homePage.goTo();
    await homePage.navigateToTanksPage();
    await page.locator("strong[class*='product name'] [class='product-item-link']")
    .filter({hasText:product}).click()
    // const allProducts = page.locator(
    //     "strong[class*='product name'] [class='product-item-link']"
    // );
 
    // const productsCount = await allProducts.count();
    // expect(productsCount).toBeGreaterThan(0);
 
    // for (let i = 0; i < productsCount; i++) {
    //     let text = await allProducts.nth(i).textContent();
    //     text = text.trim();
    //     if (text === product) {
    //         await allProducts.nth(i).click();
    //         break;
    //     }
    // }
 
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
 
    await page.waitForSelector(".counter-number");
 
    await page.locator("a[class*='showcart']").click();
    await expect(
        page.locator("button[id*='top-cart-btn-checkout']")
    ).toBeAttached();
    await page.waitForTimeout(2000);
    await page.locator("button[id*='top-cart-btn-checkout']").click();
 
    //**********Checkout Screen **************/
    //console.log(Math.floor((Math.random()*100)+10))
 
    await expect(
        page
            .locator("//*[text()='Order Summary']/following-sibling::div//div")
            .last()
    ).toBeAttached();
    const randomData = new Date().getMilliseconds();
 
    await page
        .locator("div[class*='control _with-tooltip'] input[id='customer-email']")
        .fill("test" + randomData + "@test.com");
    await page.locator("[name='firstname']").fill("QA" + randomData);
    await page.locator("[name='lastname']").fill("Test" + randomData);
    await page.locator("[name='street[0]']").fill("6789 N willi");
    await page.locator("[name='city']").fill("Portland");
    await page.locator("[name='region_id']").selectOption("Oregon");
    await page.locator("[name='postcode']").fill("986451");
    await page.locator("[name='telephone']").fill("1231231231");
    await page.locator("[value='flatrate_flatrate']").click();
    await page.locator("[class*='button action continue primary']").click();
 
    /********Review ********/
    await expect(page.locator("//*[text()='Payment Method']")).toBeAttached();
    //await page.waitForSelector("//*[text()='Payment Method']");
    await expect(
        page.locator("//div[@class='details-qty']//span[@class='value']")
    ).toHaveText(qty);
    await expect(page.locator(".product-item-name")).toHaveText(product);
    await page.locator("[class*='action primary checkout']").click();
 
    /********Thank you for your purchase! ********/
    await expect(
        page.locator("//*[text()='Thank you for your purchase!']")
    ).toBeAttached();
    const orderNo = await page
        .locator("div[class='checkout-success'] p span")
        .textContent();
    console.log(`the order number is ${orderNo}`);
    expect(orderNo).toBeTruthy();
    //console.log(await page.locator("//div[@class='checkout-success']/p/span").textContent())
    //await page.pause()
});
 
