import { expect } from "@playwright/test";

const {testCustom}=require('./utils/test-base');
const DateUtils = require('./utils/DateUtils');
const RandomUtils = require('./utils/RandomUtils');
const { PageManager } = require('./PageManager');
const testData=JSON.parse(JSON.stringify(require('./testdata/data.json')))


testCustom("New User", async ({ browser,testDataForOrder }) => {
    const product = testDataForOrder.product
    const qty = testDataForOrder.qty
    console.log(testDataForOrder.size)
    console.log(testDataForOrder.color)
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

    await productDetailPage.selectProductSize(testDataForOrder.size);
    await productDetailPage.selectProductColor(testDataForOrder.color);
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
        streetAddress: testDataForOrder.streetAddress,
        city: testDataForOrder.city,
        region: testDataForOrder.region,
        postCode: testDataForOrder.postCode,
        mobileNo: testDataForOrder.mobileNo,
        shippingMethod:testDataForOrder.shippingMethod  // or "tablerate"
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




