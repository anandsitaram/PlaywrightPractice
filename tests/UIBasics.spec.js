import { test } from '@playwright/test';

test("First Test using Browser context",async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://www.google.com/")
console.log(await page.title())



    await context.close();


})


test("First Test using page",async({page})=>{


    await page.goto("https://www.google.com/")
console.log(await page.title())



    await page.close();


})