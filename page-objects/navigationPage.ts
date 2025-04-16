//we neeed to import the page fixture from the plaaywright library
import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{  // we created the class  // we need to export to class to be visible in other files
// wehen we entend the page this.page conflicts with the HelperBase instance page so we need to use super 

   
    readonly fromLayoutdMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableManuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) { //inside the class we created the constructor // we need to pass the required paramter to call the page object page paramter is Page

        super(page)// we assigned this paramater to local field that is related this particular class
        this.fromLayoutdMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableManuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }


//instead of the locator keeping in the constructor keeping the locators inside of the functional methods of the object to evade duplication and keeping simplicity


    async formLayOutsPage() {
        await this.selectGroupMenuItem('Forms') //it means we use this page instance to be passed from 
        //await this.page.waitForTimeout(1000)
        // we could extend the base class methods with extend key word 
        await this.fromLayoutdMenuItem.click()
        await this.waitForNumberOfSeconds(2)

    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.datePickerMenuItem.click()

    }




    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.waitForTimeout(1000)
        await this.smartTableManuItem.click()

    }


    async toastPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.waitForTimeout(1000)
        await this.toastrMenuItem.click()

    }




    async toolTipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')

        await this.toastrMenuItem.click()

    }




    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)

        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        if (expandedState == "false") {
            await groupMenuItem.click()
        }

    }
}