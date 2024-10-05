class OrderSuccessPage{
   
    constructor(page){
        this.page=page;
         this.orderNoTxt=page.locator("div[class='checkout-success'] p span")
         this.OrderSuccessHeader=page.locator("//*[text()='Thank you for your purchase!']")

    }

    async getOrderNo(){
        return  await  this.orderNoTxt.textContent();
    }


    async waitTillPageLoaded(){
        await this.OrderSuccessHeader.waitFor({ state: 'attached' });
    }





}

module.exports={OrderSuccessPage}