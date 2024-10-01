class ProductDetailPage{

    constructor(page){
        this.page=page
        this.productName=this.page.locator("h1[class='page-title'] span")
        this.productPrice=this.page.locator("div[class='product-info-price'] >>span[class='price']")
        this.productQty=this.page.locator("#qty")
        this.addToCartBtn=this.page.locator("#product-addtocart-button")
        this.countNumber=this.page.locator(".counter-number")

    }

    async getProductName(){
        return await this.productName.textContent();
    }

    async getProductPrice(){
        return await this.productPrice.textContent();
    }

    async selectProductSize(size){
        await this.page.locator("div[option-label='"+size+"']").click()

    }

    async selectProductColor(color){
        await this.page.locator("div[option-label='"+color+"']").click()
    }
    async selectQty(qty){
        await this.productQty.fill(qty)
    }

    async addTheProduct(){
        await  this.addToCartBtn.click();
    }

    async waitForCountNumber(){
        await this.countNumber.waitFor({state:'visible'})
    }
    
}


module.exports={ProductDetailPage}