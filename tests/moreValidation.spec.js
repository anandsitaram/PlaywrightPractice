import { test, expect } from "@playwright/test";

test.skip("Visible and Hiddeen", async ({ page }) => {
  await page.goto("https://www.google.co.in/");
  await page.goto("https://in.search.yahoo.com/?fr2=inr");
  console.log(await page.title());
  await page.goBack();
  console.log(await page.title());
  await page.goForward();
  console.log(await page.title());
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  console.log(await page.title());
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test.skip("Pop up", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  console.log(await page.title());
  await page.locator("#confirmbtn").click();
  //pop up
  page.on("dialog", (dialog) => dialog.accept());

  await page.locator("#alertbtn").click();
  //pop up
  page.on("dialog", (dialog) => dialog.accept());
});

test("Frame Example", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());

    const frame= page.frameLocator("#courses-iframe")
    await frame.locator("li a[href*='lifetime-access']:visible").click()
    const txt=await frame.locator(".text h2").textContent()
    let val=txt.split(" ")[1];
    console.log(val)

  });