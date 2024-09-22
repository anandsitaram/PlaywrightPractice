import { test, expect, request } from "@playwright/test";
const ApiUtils = require('./utils/ApiUtils');

let token;
test.beforeEach("Before All", async () => {
   const payload= { userEmail: "qaatest@test.com", userPassword: "Test@123" }
    const newContext = await request.newContext();
    const apiUtils=  new ApiUtils(newContext,payload)
    token =await apiUtils.getToken();
});


test('Login using Api',async ({page})=>{
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token);
    // await page.goto("https://rahulshettyacademy.com/client")
    // await page.locator("#userEmail").fill("qaatest@test.com")
    // await page.locator("#userPassword").fill("Test@123")
    // await page.locator("#login").click()
     await page.goto("https://rahulshettyacademy.com/client")


    console.log(await page.title());
    await expect( page.getByRole('button',{name:'Home'})).toBeVisible()

})
