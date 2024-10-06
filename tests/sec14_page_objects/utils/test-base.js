//Fixture Example

const base =require('@playwright/test')

exports.testCustom=base.test.extend(
{
    testDataForOrder: {

        product:"Rocco Gym Tank",
        qty:"4",
        color:"Blue",
        size:"XS",
        streetAddress: "6789 N Willi",
        city: "Portland",
        region: "Oregon",
        postCode: "986451",
        mobileNo: "1231231231",
        shippingMethod: "flatrate" 
    
    }
}

)

