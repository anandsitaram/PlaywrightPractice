class ReviewPage{
   
    constructor(page){
        this.page=page;
        this.paymentMethodTxt=page.locator("//*[text()='Payment Method']")
        this.qtyTxt= page.locator("//div[@class='details-qty']//span[@class='value']")
        this.productNameTxt=page.locator(".product-item-name")
        this.placeOrderBtn=page.locator("[class*='action primary checkout']");
    }

    async waitTillPageLoaded(){
        await this.paymentMethodTxt.waitFor({ state: 'attached' });
    }

    async getQty(){
       return await this.qtyTxt.textContent();
    }

    async getProductName(){
        return await this.productNameTxt.textContent();
    }

    async clickOnPlaceOrderBtn(){
        await this.placeOrderBtn.click()
    }





}

module.exports={ReviewPage}