import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';  //we need to import navigation page class
import { FormLayOutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';
export class PageManager {

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLaysOutPage: FormLayOutsPage
    private readonly datePickerPage: DatePickerPage


    constructor(page: Page) {
        this.page = page

        this.navigationPage = new NavigationPage(this.page)
        this.formLaysOutPage = new FormLayOutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)

    }

    //we need to create a method to return all the instances of the object
    get navigateTo() {
        return this.navigationPage

    }

    get onFormLayoutPage() {
        return this.formLaysOutPage
    }

    get onDatepickerPage() {
        return this.datePickerPage
    }

}