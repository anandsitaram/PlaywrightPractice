import { test,expect} from "@playwright/test";
 
test("Visual Testing -  Always Pass", async ({ browser }) => {
 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.in/");
    await page.locator("#twotabsearchtextbox").fill("Iphone 16");
    await page.locator("#twotabsearchtextbox").press('Enter');
    await page.waitForLoadState('domcontentloaded')
    expect(await page.screenshot()).toMatchSnapshot({path:'tests/sec12_visual_testing/visual_pass.png'})
    
 
    
});

 
test("Visual Testing -  Fail", async ({ browser }) => {
 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot({path:'tests/sec12_visual_testing/visual_fail.png'})
    
 
    
});