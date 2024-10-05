// class HomePage{

//     constructor(page){
//         this.page=page;
//         this.men=page.locator("//span[text()='Men']/ancestor::a")
//         this.top=page.getByText("Tops")
//         this.tanks=page.getByRole('menuitem', { name: 'Tanks' })

//     }

//     async goTo(){
//         await this.page.goto("https://magento.softwaretestingboard.com/");
//         await this.page.waitForLoadState("networkidle");

//     }

//    async navigateToTanksPage(){
//     await  this.men.hover();
//     await  this.top.last().hover();
//     await this.tanks.click();
//     await this.page.waitForLoadState("networkidle");

//     }


// }

// module.exports={HomePage}

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto("https://magento.softwaretestingboard.com/");
        await this.page.waitForLoadState("networkidle");
    }

    // Method to hover on the main menu
    async mouseHoverOnMainMenu(mainMenuName) {
        const mainMenu = this.page.locator(`//span[text()='${mainMenuName}']/ancestor::a`);
        await mainMenu.waitFor({ state: 'visible' });
        await mainMenu.hover();
    }

    // Method to hover on the sub-menu and click the specified item
    async mouseHoverOnSubMenu(mainMenuName, subMenuItem) {
        const mainMenuLoc = this.page.getByText(mainMenuName).last();
        
        // Wait for the main menu to be visible and hover
        await mainMenuLoc.waitFor({ state: 'visible' });
        await mainMenuLoc.hover();
    
        // Check if subMenuItem is provided
        if (subMenuItem) {
            // Locate the submenu item and wait for it to be visible
            const subMenuLoc = this.page.getByRole('menuitem', { name: subMenuItem });
            await subMenuLoc.waitFor({ state: 'visible' });
            await subMenuLoc.click();
        }
    }

}

module.exports={HomePage}