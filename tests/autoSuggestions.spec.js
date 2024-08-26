import { test, expect } from '@playwright/test'

test('Search Auto Suggestions Test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.amazon.in/")
    await page.locator("#twotabsearchtextbox").pressSequentially("Oneplus",{delay:100})
    const suggestions=page.locator(".autocomplete-results-container");
    await suggestions.waitFor();
    const count=await suggestions.locator("[role='button']").count();
for(let i=0;i<count;i++){
    const text=await suggestions.locator("[role='button']").nth(i).textContent()
    if(text.trim() === "oneplus nord ce 4"){
        await suggestions.locator("[role='button']").nth(i).click();
        break;
    }
}
await page.waitForLoadState('load')
console.log(await page.title())

})
