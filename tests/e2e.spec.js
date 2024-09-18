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


test.skip('test to add given product for new user ', async ({ browser }) => {


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

    await page.locator("#qty").fill("3")
    const sizeSelected=await page.locator("div.swatch-attribute.size span.swatch-attribute-selected-option").textContent();
    const colorSelected=await page.locator("div.swatch-attribute.color span.swatch-attribute-selected-option").textContent();
    const qtySelected =await page.locator("#qty").inputValue();
    console.log(sizeSelected)
    console.log(colorSelected)
    console.log(qtySelected)
    await page.locator("[title='Add to Cart']").click();
    await page.locator(".counter-number").waitFor()    
   console.log( await page.locator(".counter-number").textContent())
   await page.locator(".counter-number").click();
   await page.waitForTimeout(3000);
      await page.locator("#top-cart-btn-checkout").click();

   await page.locator("span:has-text('Order Summary')").waitFor()


   console.log( await page.locator(".product-item-name").textContent())
   await expect( page.locator("div.details-qty span.value")).toHaveText(qtySelected)

  //Checkout

  await page.locator("//div[@class='control _with-tooltip']//input[@id='customer-email']").fill("test@test.com")
  await page.locator("[name='firstname']").fill("test")
  await page.locator("[name='lastname']").fill("qa")
  await page.locator("[name='street[0]']").fill("test qaasas")
  await page.locator("[name='city']").fill("asasasas")
  await page.locator("[name='postcode']").fill("12312")

  await page.locator("[name='region_id']").selectOption("Texas")
  await page.locator("[name='telephone']").fill("12312312311")
  await page.locator("[value='flatrate_flatrate']").click()

  await page.locator("text='Next'").click()


  //Review

  await expect(page.locator("text='Payment Method'")).toBeVisible();

  await page.locator("text='Place Order'").click()
  await page.waitForTimeout(3000);
  //Order Confirmation
  await expect(page.locator("text='Thank you for your purchase!'")).toBeVisible();
console.log(await page.locator(".checkout-success").textContent())
  await page.pause()



})
//qatest@test.com
//Test@123

test("Purchase product for existing user",async ({ browser })=>{

    const productName="Balboa Persistence Tee";
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://magento.softwaretestingboard.com/")
    await page.locator("div[class='panel header'] li[data-label='or'] a").click()
    await page.locator("#email").fill("qatest@test.com")
    await page.locator("#pass").fill("Test@123")
    await page.locator("[class*='action login primary']").click()
    await page.waitForTimeout(3000);
    await page.locator(".counter-number").waitFor({timeout:5000}).catch(()=>console.log("Elment is not visible"))
    const flg=await page .locator(".counter-number").isVisible();    

    if(flg){
        const initcount=await page.locator(".counter-number").textContent()
        if (initcount>0){
          await page.locator(".counter-number").click();
          await page.waitForTimeout(3000);
             await page.locator("[title='Remove item']").click();
             await page.locator("[class*='action-primary action-accept']").click()
        }
    }
  

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

    await page.locator("#qty").fill("3")
    const sizeSelected=await page.locator("div.swatch-attribute.size span.swatch-attribute-selected-option").textContent();
    const colorSelected=await page.locator("div.swatch-attribute.color span.swatch-attribute-selected-option").textContent();
    const qtySelected =await page.locator("#qty").inputValue();
    console.log(sizeSelected)
    console.log(colorSelected)
    console.log(qtySelected)
    await page.locator("[title='Add to Cart']").click();
    await page.waitForTimeout(2000);
    await page.locator(".counter-number").waitFor()    
   console.log( await page.locator(".counter-number").textContent())
   await page.locator(".counter-number").click();
   await page.waitForTimeout(3000);
    await page.locator("#top-cart-btn-checkout").click();

   await page.locator("span:has-text('Order Summary')").waitFor()


   console.log( await page.locator(".product-item-name").textContent())
   await expect( page.locator("div.details-qty span.value")).toHaveText(qtySelected)

  //Checkout

  await page.locator("[value='flatrate_flatrate']").click()

  await page.locator("text='Next'").click()


  //Review

  await expect(page.locator("text='Payment Method'")).toBeVisible();

  await page.locator("text='Place Order'").click()
  await page.waitForTimeout(3000);
  //Order Confirmation
  await expect(page.locator("text='Thank you for your purchase!'")).toBeVisible();
console.log(await page.locator(".checkout-success").textContent())
  await page.pause()









})