import {expect, test} from '@playwright/test'

test.skip('Test for static select DropDown', async({page})=>{
await page.goto("https://practice.expandtesting.com/dropdown")
const dropdown=page.locator('#country')
//Select
await dropdown.selectOption("Mauritania")
//for debuging
await page.pause();

})

test.skip('Test for radio button dropdown', async({page})=>{
    await page.goto("https://practice.expandtesting.com/radio-buttons")
    const blkBtn=page.locator('#black')
    const footballBtn=page.locator('#football')
    //radio button
    await blkBtn.click();
    await footballBtn.click();

    console.log(await blkBtn.isChecked())
    console.log(await footballBtn.isChecked())

    await expect(blkBtn).toBeChecked();
    await expect(footballBtn).toBeChecked();

    //uncheck
    await blkBtn.uncheck();
    await footballBtn.uncheck();

    console.log(await blkBtn.isChecked())
    console.log(await footballBtn.isChecked())

    
    //There is no assertion to verify uncheck
    expect(await blkBtn.isChecked()).toBeFalsy();
    expect(await footballBtn.isChecked()).toBeFalsy();



    //for debuging
    //await page.pause();
    
    })

    test('Test for links ', async({page})=>{
        await page.goto("https://practice.expandtesting.com/")
        const automationTraningLink=page.locator('#main-navbar > a')
        await expect(automationTraningLink).toHaveAttribute("href")

             await expect(automationTraningLink).toHaveAttribute("class","btn btn-sut d-lg-inline-block my-2 my-md-0 ms-md-3")
             await expect(automationTraningLink).toContainText("Automation Training")
        })