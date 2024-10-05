class ProductListPage {
    constructor(page) {
        this.page = page;
    }

    // Method to click on a product by its name
    async clickOnProduct(productName) {
      const specificProduct = this.page.locator("strong[class*='product name'] [class='product-item-link']").filter({ hasText: productName });

      // Wait for the specific product to be visible
      await specificProduct.waitFor({ state: 'visible' });

      // Click on the specific product
      await specificProduct.click();
    }
}

module.exports = { ProductListPage };