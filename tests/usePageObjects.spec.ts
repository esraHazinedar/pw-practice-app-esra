import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";
//import { NavigationPage } from '../page-objects/navigationPage';  //we need to import navigation page class
//import { FormLayOutsPage } from '../page-objects/formLayoutsPage';
//import { DatePickerPage } from '../page-objects/datePickerPage';
test.beforeEach('The locatortest', async ({ page }) => {

    await page.goto('/')



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
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}.@test.com`
    console.log(randomFullName)
    //  const navigateTo = new NavigationPage(page) // we dont need this any more we have pagemanager 
   // const navigateTo = new NavigationPage(page)

    //const onFormLayoutsPage = new FormLayOutsPage(page)

   // const onDatePickerPage = new DatePickerPage(page)
   

    await pm.navigateTo.formLayOutsPage()

    await pm.onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSElectionOption(process.env.USERNAME,process.env.PASSWORD,'Option 2')
//we can create a screenshot folder in the project
    await page.screenshot({path:'home/formslayoutPage.png'})

    await pm.onFormLayoutPage.submitInLİneFormWithNameEmailAndCheckbox(randomFullName,randomEmail,true)
    //we can just tkae a screen shot of a specif place elemenet
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({path:'home/inlineform.png'})
    //we can send the binary to others
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
     await pm.navigateTo.datePickerPage()

     await pm.onDatepickerPage.selectCommonDatePickerDateFromToday(10)

     await pm.onDatepickerPage.selectDatePickerWithRangeFromToday(17,20)

})




test.only('testing with argos CI', async ({ page }) => {
    const pm = new PageManager(page)
   
    
     await pm.navigateTo.formLayOutsPage()
     await argosScreenshot(page, "form layout page");
 
     await pm.navigateTo.datePickerPage()
     await argosScreenshot(page, "datepicker page");
     
 })

/**
 * NPM TERMİNAL COMMENTS
npx playwright test usePageObjects.spec.ts --project=chromium

we candle these comments by placing them in package.json() file
1.packake.json() file
2.  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "pageObjects-chrome":"npx playwright test usePageObjects.spec.ts --project=chromium"
     "pageObjects-firefox":"npx playwright test usePageObjects.spec.ts --project=firefox"
  },


  3.first npm run then type in terminal:npm run pageObjects-chrome
  4. I can change the browser : navigate to form page 
 */