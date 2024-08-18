import {test,expect} from '@playwright/test'

test.skip("Login test on openmrs", async({page})=>{

    await page.goto("https://demo.openmrs.org/openmrs/login.htm")
    await page.locator("#username").fill("admin")
    await page.locator("#password").fill("Admin123")
    await page.locator("#Laboratory").click()
    await page.locator("#loginButton").click()
    console.log(await page.title())

    

})

test.skip("Login test on orangehrmlive", async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/")
    await page.locator("[name='username']").fill("Admins")
    await page.locator("[placeholder='Password']").fill("admin123")
    await page.locator("[type='submit']").click()
    console.log(await page.locator("[class*='oxd-alert-content']").first().textContent())
    await expect(page.locator("[class*='oxd-alert-content']").first()).toHaveText("Invalid credentials")

    

})

test.skip("Search test on amazon", async({page})=>{

    await page.goto("https://www.amazon.in/")
    await page.locator("#twotabsearchtextbox").fill("Iphone 15")
    await page.locator("#nav-search-submit-button").click();
     console.log(await page.locator("span[class='a-size-medium a-color-base a-text-normal']").nth(1).textContent())
     const allTitles=page.locator("span[class='a-size-medium a-color-base a-text-normal']");
     //It won't work because of auto wait not applicable for allTextContents()
    // console.log(await allTitles.allTextContents())
     console.log(await allTitles.first().textContent())
     console.log(await allTitles.last().textContent())
    

})


test.skip("Search test on amazon for list example-waitForLoadState ", async({page})=>{

    await page.goto("https://www.amazon.in/")
    await page.locator("#twotabsearchtextbox").fill("Iphone 15")
    await page.locator("#nav-search-submit-button").click();
    await page.waitForLoadState('load');
    const allTitles=page.locator("span[class='a-size-medium a-color-base a-text-normal']");
    console.log(await allTitles.allTextContents())
    console.log(await allTitles.first().textContent())
    console.log(await allTitles.last().textContent())


    

})


test("Search test on amazon for list example-waitFor ", async({page})=>{

    await page.goto("https://www.amazon.in/")
    await page.locator("#twotabsearchtextbox").fill("Iphone 15")
    await page.locator("#nav-search-submit-button").click();
    await page.locator("span[class='a-size-medium a-color-base a-text-normal']").first().waitFor();
    const allTitles=page.locator("span[class='a-size-medium a-color-base a-text-normal']");
    console.log(await allTitles.allTextContents())
    console.log(await allTitles.first().textContent())
    console.log(await allTitles.last().textContent())


    

})