class ProductListPage{

    constructor(page){
        this.page=page;
    }

    async clickOnProduct(productName){
        await this.page.locator("strong[class*='product name'] [class='product-item-link']")
        .filter({hasText:productName}).click()

        
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
    }


}

module.exports={ProductListPage}