class MenuPage {
    constructor(page) {
        this.page = page;
        this.cartLinkLocator = page.locator("a[class*='showcart']");
        this.checkoutButtonLocator = page.locator("button[id*='top-cart-btn-checkout']");
    }

    async openCart() {
        await this.page.waitForTimeout(2000)
        await this.cartLinkLocator.waitFor({ state: 'attached' });
        await this.cartLinkLocator.click();
    }

    async waitForCheckoutButton() {
        // Wait for the checkout button to be attached to the DOMy
        await this.checkoutButtonLocator.waitFor({ state: 'attached' });
    }

    async clickCheckoutButton() {
        // Wait for the checkout button to be visible before clicking
        await this.checkoutButtonLocator.waitFor({ state: 'visible' });
        await this.checkoutButtonLocator.click();
    }
}

module.exports = {MenuPage};
