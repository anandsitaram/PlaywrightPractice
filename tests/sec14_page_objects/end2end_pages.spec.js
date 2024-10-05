import { test, expect } from "@playwright/test";
const { HomePage } = require('./HomePage');
const { ProductListPage } = require('./ProductListPage');
const { ProductDetailPage } = require('./ProductDetailPage');
const { MenuPage } = require('./MenuPage');
const { CheckoutPage } = require('./CheckoutPage');
const { ReviewPage } = require('./ReviewPage');
const { OrderSuccessPage } = require('./OrderSuccessPage');
const DateUtils = require('./utils/DateUtils');
const RandomUtils = require('./utils/RandomUtils');

test("New User", async ({ browser }) => {
    const product = "Rocco Gym Tank";
    const qty = "3";
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    await homePage.goTo();
    await homePage.mouseHoverOnMainMenu('Men');
    await homePage.mouseHoverOnSubMenu('Tops', 'Tanks');

    const productListPage = new ProductListPage(page);
    await productListPage.clickOnProduct(product);

    const productDetailPage = new ProductDetailPage(page);
    expect(await productDetailPage.getProductName()).toBe(product);
    expect(await productDetailPage.getProductPrice()).toBeTruthy();

    await productDetailPage.selectProductSize("XS");
    await productDetailPage.selectProductColor("Blue");
    await productDetailPage.selectQty(qty);
    await productDetailPage.addTheProduct();
    await productDetailPage.waitForCountNumber();

    const menuPage = new MenuPage(page);
    await menuPage.openCart();
    await menuPage.waitForCheckoutButton();
    await menuPage.clickCheckoutButton();

    // Checkout Screen
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.waitTillPageLoaded();

    const currentDate = DateUtils.getCurrentDate();
    const addressData = {
        email: "test" + currentDate + "@test.com",
        firstName: "AutoQA",
        lastName: RandomUtils.getRandomLowerCaseString(3),
        streetAddress: "6789 N Willi",
        city: "Portland",
        region: "Oregon",
        postCode: "986451",
        mobileNo: "1231231231",
        shippingMethod: "flatrate"  // or "tablerate"
    };

    await checkoutPage.fillCheckoutForm(addressData);
    await checkoutPage.clickContinue();

    // Review
    const reviewPage = new ReviewPage(page);
    await reviewPage.waitTillPageLoaded();

    // Using expect(locator).toHaveText(expected)
    await expect(reviewPage.qtyTxt).toHaveText(qty);
    await expect(reviewPage.productNameTxt).toHaveText(product);
    
    await reviewPage.clickOnPlaceOrderBtn();

    // Thank you for your purchase!
    const orderSuccessPage = new OrderSuccessPage(page);
    await orderSuccessPage.waitTillPageLoaded();

    const orderNo = await orderSuccessPage.getOrderNo();
    console.log(`The order number is ${orderNo}`);
    expect(orderNo).toBeTruthy();
});
