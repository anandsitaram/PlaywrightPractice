const { HomePage } = require('./HomePage');
const { ProductListPage } = require('./ProductListPage');
const { ProductDetailPage } = require('./ProductDetailPage');
const { MenuPage } = require('./MenuPage');
const { CheckoutPage } = require('./CheckoutPage');
const { ReviewPage } = require('./ReviewPage');
const { OrderSuccessPage } = require('./OrderSuccessPage');

class PageManager{

constructor(page){
    this.page=page;
    this.homePage=new HomePage(page)
    this.menuPage= new MenuPage(page)
    this.productDetailPage=new ProductDetailPage(page);
    this.productListPage= new ProductListPage(page)
    this.checkoutPage=new CheckoutPage(page)
    this.reviewPage=new ReviewPage(page)
    this.orderSuccessPage=new OrderSuccessPage(page)

}

getHomePage(){
    return this.homePage;
}

getProductDetailPage(){
    return this.productDetailPage;
}

getProductListPage(){
    return this.productListPage;
}

getMenuPage(){
    return this.menuPage;
}

getCheckoutPage(){
    return this.checkoutPage;
}

getReviewPage(){
    return this.reviewPage;
}

getOrderSuccessPage(){
    return this.orderSuccessPage;
}


}

module.exports={PageManager}