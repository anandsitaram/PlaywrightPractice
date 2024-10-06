import { test, expect } from "@playwright/test";

const DateUtils = require('./utils/DateUtils');
const RandomUtils = require('./utils/RandomUtils');
const { PageManager } = require('./PageManager');
const testData=JSON.parse(JSON.stringify(require('./testdata/data.json')))
const parameterize_data=JSON.parse(JSON.stringify(require('./testdata/parameterize_data.json')))


test.skip("New User", async ({ browser }) => {
    const product = testData.product
    const qty = testData.qty
    console.log(testData.size)
    console.log(testData.color)
    const context = await browser.newContext();
    const page = await context.newPage();
  const pageManager=new PageManager(page)
    const homePage = pageManager.getHomePage();
    await homePage.goTo();
    await homePage.mouseHoverOnMainMenu('Men');
    await homePage.mouseHoverOnSubMenu('Tops', 'Tanks');

    const productListPage = pageManager.getProductListPage()
    await productListPage.clickOnProduct(product);

    const productDetailPage = pageManager.getProductDetailPage()
    expect(await productDetailPage.getProductName()).toBe(product);
    expect(await productDetailPage.getProductPrice()).toBeTruthy();

    await productDetailPage.selectProductSize(testData.size);
    await productDetailPage.selectProductColor(testData.color);
    await productDetailPage.selectQty(qty);
    await productDetailPage.addTheProduct();
    await productDetailPage.waitForCountNumber();

    const menuPage = pageManager.getMenuPage()
    await menuPage.openCart();
    await menuPage.waitForCheckoutButton();
    await menuPage.clickCheckoutButton();

    // Checkout Screen
    const checkoutPage = pageManager.getCheckoutPage()
    await checkoutPage.waitTillPageLoaded();

    const currentDate = DateUtils.getCurrentDate();
    const addressData = {
        email: "test" + currentDate + "@test.com",
        firstName: "AutoQA",
        lastName: RandomUtils.getRandomLowerCaseString(3),
        streetAddress: testData.streetAddress,
        city: testData.city,
        region: testData.region,
        postCode: testData.postCode,
        mobileNo: testData.mobileNo,
        shippingMethod:testData.shippingMethod  // or "tablerate"
    };

    await checkoutPage.fillCheckoutForm(addressData);
    await checkoutPage.clickContinue();

    // Review
    const reviewPage = pageManager.getReviewPage()
    await reviewPage.waitTillPageLoaded();

    // Using expect(locator).toHaveText(expected)
    await expect(reviewPage.qtyTxt).toHaveText(qty);
    await expect(reviewPage.productNameTxt).toHaveText(product);
    
    await reviewPage.clickOnPlaceOrderBtn();

    // Thank you for your purchase!
    const orderSuccessPage = pageManager.getOrderSuccessPage()
    await orderSuccessPage.waitTillPageLoaded();

    const orderNo = await orderSuccessPage.getOrderNo();
    console.log(`The order number is ${orderNo}`);
    expect(orderNo).toBeTruthy();
});

for(const data of parameterize_data){

    test(`New User- Parameterize -${data.product}`, async ({ browser }) => {
        const product = data.product
        const qty = data.qty
        console.log(data.size)
        console.log(data.color)
        const context = await browser.newContext();
        const page = await context.newPage();
      const pageManager=new PageManager(page)
        const homePage = pageManager.getHomePage();
        await homePage.goTo();
        await homePage.mouseHoverOnMainMenu('Men');
        await homePage.mouseHoverOnSubMenu('Tops', 'Tanks');
    
        const productListPage = pageManager.getProductListPage()
        await productListPage.clickOnProduct(product);
    
        const productDetailPage = pageManager.getProductDetailPage()
        expect(await productDetailPage.getProductName()).toBe(product);
        expect(await productDetailPage.getProductPrice()).toBeTruthy();
    
        await productDetailPage.selectProductSize(data.size);
        await productDetailPage.selectProductColor(data.color);
        await productDetailPage.selectQty(qty);
        await productDetailPage.addTheProduct();
        await productDetailPage.waitForCountNumber();
    
        const menuPage = pageManager.getMenuPage()
        await menuPage.openCart();
        await menuPage.waitForCheckoutButton();
        await menuPage.clickCheckoutButton();
    
        // Checkout Screen
        const checkoutPage = pageManager.getCheckoutPage()
        await checkoutPage.waitTillPageLoaded();
    
        const currentDate = DateUtils.getCurrentDate();
        const addressData = {
            email: "test" + currentDate + "@test.com",
            firstName: "AutoQA",
            lastName: RandomUtils.getRandomLowerCaseString(3),
            streetAddress: data.streetAddress,
            city: data.city,
            region: data.region,
            postCode: data.postCode,
            mobileNo: data.mobileNo,
            shippingMethod:data.shippingMethod  // or "tablerate"
        };
    
        await checkoutPage.fillCheckoutForm(addressData);
        await checkoutPage.clickContinue();
    
        // Review
        const reviewPage = pageManager.getReviewPage()
        await reviewPage.waitTillPageLoaded();
    
        // Using expect(locator).toHaveText(expected)
        await expect(reviewPage.qtyTxt).toHaveText(qty);
        await expect(reviewPage.productNameTxt).toHaveText(product);
        
        await reviewPage.clickOnPlaceOrderBtn();
    
        // Thank you for your purchase!
        const orderSuccessPage = pageManager.getOrderSuccessPage()
        await orderSuccessPage.waitTillPageLoaded();
    
        const orderNo = await orderSuccessPage.getOrderNo();
        console.log(`The order number is ${orderNo}`);
        expect(orderNo).toBeTruthy();
    });
}


