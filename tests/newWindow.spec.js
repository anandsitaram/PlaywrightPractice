import {test,expect} from '@playwright/test'

test('Test for New Window', async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://practice.expandtesting.com/windows")
     const newWindow= page.locator("a[href='/windows/new']")
    //const newPage= await context.waitForEvent('page') //Listen for any new page - promise - pending, rejected,fullfilled

    //await newWindow.click();//click on new link which opens new page

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//Listen for any new page - promise - pending, rejected,fullfilled
            newWindow.click()//click on new link which opens new page
        ]
    )
    
    const newPageTxt=newPage.locator("div[class='example'] h1")
    console.log(await newPageTxt.textContent())
    console.log(await page.locator("li[class='breadcrumb-item'] a").textContent())
  // await page.pause();
    context.close();

   


})