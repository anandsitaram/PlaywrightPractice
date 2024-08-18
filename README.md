### **Playwright Installation :-**

npm init playwright@latest

### **Playwright Test Execution**

* Headless mode -
**npx playwright test**

* Head mode - 
**npx playwright test --headed**

* To run specific browser
**npx playwright test --project=chrome** 

* To run specific spec file
**npx playwright test example.spec.ts**  

* To run specific test
**npx playwright test -g 'has title'**

* To run in UI mode
  **npx playwright test --ui**

* To Run in trace on
  **npx playwright test --project=chromium --trace on**

* To Run in debug mode
  **npx playwright test --project=chromium --debug**

* To open last HTML report run:
**npx playwright show-report**

### Different Possible combination of Locators

    //By Id  - # followed by id value
    await page.locator('#username').fill("admin")

    //By class name   - . followed by any class name value
    await page.locator('.cds--text-input').fill("admin")

    //By attribute
    await page.locator('[name="username"]').fill("admin")

    //By class name  -full value
    await page.locator("[class='cds--text-input']").fill("admin")

    //By combining different selectors
    await page.locator('input[name="username"]').fill("admin")

    //By xpath - Not recommended -https://playwright.dev/docs/other-locators
    await page.locator("//input[@id='username']").fill("admin")

    //By partial text
    await  page.locator(":text('Cont')").click()

    //By exact text
    await  page.locator(":text-is('Continue')").click()

    **page.locator('.cds--text-input') - >Does not require await as return type is not promise**

### User Facing Locators
[Recommended from playwright team -https://playwright.dev/docs/best-practices]

    await page.getByRole('textbox',{name:"username"}).fill("admin")

    await page.getByText("Continue").click()

    await page.getByLabel("password").fill("Admin123")

    await page.getByText("Log in").click()

    await page.getByPlaceholder("password").click()
   
    await page.getByTitle("IOT Dashboard").click()

    //Need to pass data-testid attribute value
    await  page.getByTestId("searchPatientIcon").click()
