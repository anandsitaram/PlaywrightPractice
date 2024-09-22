import {test,expect} from '@playwright/test'

test("Calender demo",async({page})=>{
    const day=17;
    const month=8;
    const year=2026;
    const expectedDate=year+"-0"+month+"-"+day
    const expectedLst=[month,day,year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(month-1).click()
    await page.locator("//abbr[text()='"+day+"']").click()
    //one way
    const date=await page.locator("div[class='react-date-picker__inputGroup'] input[name='date']").getAttribute("value")    
      //2026-08-17
    expect(date).toBe(expectedDate)
  
    //other way

    const dateLst= page.locator("react-date-picker__inputGroup__input");
 for(let i=0;i<await dateLst.count();i++){
       const value=dateLst.nth(i).getAttribute("value")
       expect(value).toEqual(expectedLst[i])
 }
   // await page.pause()

})