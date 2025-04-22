import { test, expect } from '@playwright/test';
import { timeout } from 'rxjs/operators';

test.beforeEach('new',async({page},testInfo)=>{

await page.goto(process.env.URL)

await page.getByText('Button Triggering AJAX Request').click()

testInfo.setTimeout(testInfo.timeout+2000) // we can set the the timeouts before and after hooks


})


test('auto waiting',async({page})=>{


const succesButoon= page.locator('.bg-success')


//await succesButoon.click()

//const textButton  = await succesButoon.textContent()
//await succesButoon.waitFor({state:"attached"})  //used this waiting for the locater's attached texts to be visible before assertions
const text  = await succesButoon.allTextContents()

expect(text).toContain('Data loaded with AJAX get request.') //used contain cause the return type is array not a string 

await expect(succesButoon).toHaveText('Data loaded with AJAX get request.',{timeout:5000})

})



test('alternative waits',async({page})=>{
   
    const succesButton= page.locator('.bg-success')
   
    //wait for element

   // await page.waitForSelector('.bg-success')


    //wait for particular response  
    /**
     * 1.first click on the element 
     * 2. click on the network for the elment
     * 3.then click on the haders and retriev the address for the Apı call
     */

    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')


    //wait for network call to be completed ('NOT RECOMMENDED')

    await page.waitForLoadState('networkidle') //it will wait for all apı calls to be loaded and this is not necessary and causes your test to fail for no reason 


    //theer are other waits 
   // await page.waitForURL('')
    const text = await succesButton.allTextContents()

    expect(text).toContain('Data loaded with AJAX get request.')


})


test('timeOuts',async({page})=>{
    //test.setTimeout(10000) // this will override all the timeouts 
    test.slow() // it will multiply the existent timeot 3 times
    const succesButton= page.locator('.bg-success')

    await succesButton.click({timeout:20000})
})





