class HomePage{

    constructor(page){
        this.page=page;
        this.men=page.locator("//span[text()='Men']/ancestor::a")
        this.top=page.getByText("Tops")
        this.tanks=page.getByRole('menuitem', { name: 'Tanks' })

    }

    async goTo(){
        await this.page.goto(" https://magento.softwaretestingboard.com/");
        await this.page.waitForLoadState("networkidle");

    }

   async navigateToTanksPage(){
    await  this.men.hover();
    await  this.top.last().hover();
    await this.tanks.click();
    await this.page.waitForLoadState("networkidle");

    }

}

module.exports={HomePage}