import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { NavigationPage } from '../page-objects/navigationPage';  //we need to import navigation page class
import { FormLayOutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';
test.beforeEach('The locatortest', async ({ page }) => {

    await page.goto("http://localhost:4200/")



})


test('navigate to form page ', async ({ page }) => {
   const pm = new PageManager(page)
  
   
    await pm.navigateTo.formLayOutsPage()

    await pm.navigateTo.datePickerPage()
    await pm.navigateTo.smartTablePage()
    await pm.navigateTo.toastPage()
    await pm.navigateTo.toolTipPage()
})


test('parameterized methods',async({page})=>{
    const pm = new PageManager(page)
    //  const navigateTo = new NavigationPage(page) // we dont need this any more we have pagemanager 
   // const navigateTo = new NavigationPage(page)

    //const onFormLayoutsPage = new FormLayOutsPage(page)

   // const onDatePickerPage = new DatePickerPage(page)

    await pm.navigateTo.formLayOutsPage()

    await pm.onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSElectionOption('esra@gmail.com','657585','Option 2')

    await pm.onFormLayoutPage.submitInLİneFormWithNameEmailAndCheckbox('esra haz','esratest@test.com',true)

     await pm.navigateTo.datePickerPage()

     await pm.onDatepickerPage.selectCommonDatePickerDateFromToday(10)

     await pm.onDatepickerPage.selectDatePickerWithRangeFromToday(17,20)

})