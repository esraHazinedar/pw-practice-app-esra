import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';


export class DatePickerPage extends HelperBase {



    
    constructor(page: Page) {



       super(page)
    }



    async selectCommonDatePickerDateFromToday(numberOfDaysToday: number) {
        const calenderInput = this.page.getByPlaceholder('Form Picker')

        await calenderInput.click()
        const dateToAssert = await this.selectDateInTheCalender(numberOfDaysToday)
        await expect(calenderInput).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday:number,endDayFromToday:number){
        const calenderInput = this.page.getByPlaceholder('Range Picker')

        await calenderInput.click()
        const dateToAssertStart = await this.selectDateInTheCalender(startDayFromToday)

        const dateToAssertEnd = await this.selectDateInTheCalender(endDayFromToday)

       const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

       await expect(calenderInput).toHaveValue(dateToAssert)
    }



    private async selectDateInTheCalender(numberOfDaysToday) {

        //selct all the date of the month 
        //{exact:true} method will search the eaxactly the number 1 not the contained valeus 

        ///js date for documentation 
        let date = new Date()

        date.setDate(date.getDate() + numberOfDaysToday)

        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        let calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {

            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"] ').click()

            calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()



        }


        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()

        return dateToAssert


    }
}