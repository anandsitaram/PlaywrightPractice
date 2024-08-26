import { test, expect } from '@playwright/test'

test.skip('test to get the all product names', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://magento.softwaretestingboard.com/")
    await page.locator("text='Men'").click();
    await page.locator("[class*='mens-t-shirts']").click();
    await page.waitForLoadState('networkidle')
    const allProductsEle = page.locator("//div[@class='product-item-info']")

    const count = await allProductsEle.count();

    //Get all Product Names
    const allProduttNames = [];
    for (let i = 0; i < count; i++) {
        console.log(i)
        const text = await allProductsEle.nth(i).locator(".product-item-link").textContent();
        allProduttNames.push(text)


    }
    console.log(allProduttNames)


})


test('test to add given product', async ({ browser }) => {


    const productName="Balboa Persistence Tee";
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://magento.softwaretestingboard.com/")
    await page.locator("text='Men'").click();
    await page.locator("[class*='mens-t-shirts']").click();
    await page.waitForLoadState('networkidle')
    const allProductsEle = page.locator("//div[@class='product-item-info']")

    const count = await allProductsEle.count();
    console.log(`Count of products: ${count}`); 

    //Get all Product Names
    for (let i = 0; i < count; i++) {
        console.log(i)
        const txt=await allProductsEle.nth(i).locator(".product-item-link").textContent();
        if(txt.trim() === productName){
            await allProductsEle.nth(i).locator(".product-item-link").hover();
            await allProductsEle.nth(i).locator(".product-item-link").click();

                        //await allProductsEle.nth(i).locator("[title='Add to Cart']").click();
            break;
        }
 

    }
    await page.waitForSelector("text='Qty'",{state :'visible'})

    console.log(await page.locator("[data-ui-id='page-title-wrapper']").textContent())
    console.log(await page.locator("//*[@id='product-price-526']/span").textContent())

    await page.locator("[option-label='XS']").click()

    await page.locator("[option-label='Orange']").click()

    await page.locator("[title='Add to Cart']").click();
    await page.locator(".counter-number").waitFor()    
   console.log( await page.locator(".counter-number").textContent())
   await page.locator(".counter-number").click();
   await page.locator("#top-cart-btn-checkout").click();

   await page.locator("span:has-text('Order Summary')").waitFor()


   console.log( await page.locator(".product-item-name").textContent())
   await expect( page.locator("div.details-qty span.value")).toHaveText("1")

})
