import { test, expect } from '@playwright/test';

test.beforeEach('The locatortest',async({page})=>{

await page.goto('/')

await page.getByText('Forms').click()

await page.getByText('Form Layouts').click()

})




test('Locator snytax rules',async({page})=>{
    //by Tag Name
    await page.locator('input').first().click()


    //byId
    await page.locator('#inputEmail1').click()

//by Class Value
page.locator('.shape-rectangle')

//by attribute

page.locator('[placeholder="Email"]')

//by Class value(full)

page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

//combine different selectors

page.locator('input[placeholder="Email"][nbinput]')

//by XPath is not recommended

page.locator('//*[id="inputEmail1"]')

//by partial text

page.locator(':text("Using")')


// by exact text match

page.locator(':text-is("Using the Grid")')
})




test('user facing locatores',async({page})=>{

// we find the textbox with the name email
     await page.getByRole('textbox',{name:"Email"}).first().click()


     await page.getByRole ('button',{name:"Sign in"}).first().click()
     

     await page.getByPlaceholder('Jane Doe').click()

     await page.getByLabel('Email').first().click()

     await  page.getByText('Using the Grid').click()


   //  await page.getByTitle('IoT Dashboard').click()


     await page.getByTestId('SignIn').click()

     
 


})




test('locating child elements',async({page})=>{
       

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    
    await page.locator('nb-card ').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name:'Sign in'}).first().click()


    await page.locator('nb-card').nth(3).getByRole('button').click()
    
         })

//getbyrole is a userface locator type 


         test ('locating parent elements ',async({page})=>{

//filter bytext
            await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
            //filtr by locater

            await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()

            //use filter unique to playwright

            await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:"Email"}).click()


            await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()

            await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Password"}).click()

            await page.locator('nb-card').nth(3).getByRole('button').click() //selecting by index is not prerferrable and button name was not give because it was unique
        
        })
    

       