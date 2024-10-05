class CheckoutPage{
   
    constructor(page){
        this.page = page;
        this.orderSummaryHeader = page.locator("//*[text()='Order Summary']/following-sibling::div//div");
        this.firstNameInput = page.locator("[name='firstname']");
        this.lastNameInput = page.locator("[name='lastname']");
        this.streetInput = page.locator("[name='street[0]']");
        this.cityInput = page.locator("[name='city']");
        this.regionSelect = page.locator("[name='region_id']");
        this.postcodeInput = page.locator("[name='postcode']");
        this.telephoneInput = page.locator("[name='telephone']");
        this.flatRateOption = page.locator("[value='flatrate_flatrate']");
        this.tableRateOption = page.locator("[value='tablerate_bestway']");
        this.continueButton = page.locator("[class*='button action continue primary']");
        this.emailInput=page.locator("div[class*='control _with-tooltip'] input[id='customer-email']")
     
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }
    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async fillStreetAddress(streetAddress) {
        await this.streetInput.fill(streetAddress);
    }

    async fillCity(city) {
        await this.cityInput.fill(city);
    }

    async selectRegion(region) {
        await this.regionSelect.selectOption(region);
    }

    async fillPostcode(postCode) {
        await this.postcodeInput.fill(postCode);
    }

    async fillTelephone(mobileNo) {
        await this.telephoneInput.fill(mobileNo);
    }

    async selectShippingMethod(shippingMethod) {
        switch(shippingMethod.toLowerCase()){

            case 'flatrate':await this.flatRateOption.click()
            break;
            case 'tablerate':await this.tableRateOption.click()
            break;
            default:throw new Error("Invalid OPtion")

        }
      
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async fillCheckoutForm(addressData) {
        await this.fillEmail(addressData.email)
        await this.fillFirstName(addressData.firstName);
        await this.fillLastName(addressData.lastName);
        await this.fillStreetAddress(addressData.streetAddress);
        await this.fillCity(addressData.city);
        await this.selectRegion(addressData.region);
        await this.fillPostcode(addressData.postCode);
        await this.fillTelephone(addressData.mobileNo);
        await this.selectShippingMethod(addressData.shippingMethod);
    }


    async waitTillPageLoaded() {
        await this.orderSummaryHeader.last().waitFor({ state: 'attached' });
    }
}

module.exports = { CheckoutPage };