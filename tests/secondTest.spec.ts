
import { waitForAsync } from '@angular/core/testing';
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
    
        test('locating parent elements',async({page})=>{

           //located the parent elemtn with the arguemen with text filter
          await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
          //locater filter

          await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()

          await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name:"Email"}).click()

          await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()

          //we wnat to find the email filter it has many nb-card which has only two checxboxes with the text sign in name only
          await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:"Email"}).click()
 // we used xpath whic was not recommended to find the title and then the parent element and the email
         
          await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()
 
        
        
        
        })



        test('Reusing the lcoators',async({page})=>{
          //we can create a constant to evade repetition

          const basicForm = page.locator('nb-card').filter({hasText:'Basic form'})
         //extended the first const basicform
          const email = basicForm.getByRole('textbox',{name:"Email"})
          await email.fill('test')
          await basicForm.getByRole('textbox',{name:"Password"}).fill('password')
          await basicForm.locator('nb-checkbox').click()
          await basicForm.getByRole('button').click()

         //imported assertion expect and did assertions
          await expect(email).toHaveValue('test')

          



        })




        test('extrcating valus',async({page})=>{
    //single test value for the element 

         const basicForm =  page.locator('nb-card').filter({hasText:'Basic form'})

         const button = await basicForm.locator('button').textContent()

           expect (button).toEqual('Submit')
         
//all text values  // list text of elements 

const radioButton =await  page.locator('nb-radio').allTextContents()

expect (radioButton).toContain('Option 1')


//input values


const emailBox = basicForm.getByRole('textbox',{name:'email'})

const text =await emailBox.fill("testEsra@gmail.com")

const expectedText = await emailBox.inputValue()

expect (expectedText).toEqual('testEsra@gmail.com')


//to get the attribute value

const placeholderText = await emailBox.getAttribute("placeholder")

expect (placeholderText).toEqual('Email')


        })




test('assertions',async({page})=>{
  //General Assertions
const value = 5
expect(value).toEqual(5)


const basicFormButton = page.locator('nb-card').filter({hasText:'Basic form'}).locator('button')

 const text = await basicFormButton.textContent()

 expect (text).toEqual("Submit")

 //waitForAsync.apply

 //Locator assertions

 await expect (basicFormButton).toHaveText('Submit')


 //Soft Assertions //evef if it fails it continues execution like try and cath block
 //locator assertions has time outs but general assertions do not have timeouts do not wait for any conditions


 await expect.soft(basicFormButton).toHaveText('Submit')

 await basicFormButton.click()

})



        


        