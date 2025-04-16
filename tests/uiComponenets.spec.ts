import { test, expect } from '@playwright/test';

test.beforeEach('The locatortest', async ({ page }) => {

    await page.goto("http://localhost:4200/")


})

test.describe('Form Layouts Page', () => {

    test.beforeEach(async ({ page }) => {


        await page.getByText('Forms').click()

        await page.getByText('Form Layouts').click()


    })


    test('input fields', async ({ page }) => {

        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('test@gmail.com')

        await usingTheGridEmailInput.clear()

        await usingTheGridEmailInput.pressSequentially('test2@gmail.com', { delay: 300 }) //stimulate key strokes with delays with the strokes

        //generic assertion

        const inputText = await usingTheGridEmailInput.inputValue()  //got the input text

        expect(inputText).toEqual('test2@gmail.com')

        //locator asserttion

        await expect(usingTheGridEmailInput).toHaveValue('test2@gmail.com') // locator assertion to extract the locator value

    })


    test('radio buttons', async ({ page }) => {

        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        //due to tthis value  "native-input visually-hidden" we use check method to interact 
        // await usingTheGridEmailInput.getByLabel('Option 1').check({force:true})

        //using getByRole

        await usingTheGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true })


        const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()

        expect(radioStatus).toBeTruthy()

        //locator assertion

        expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()



        await usingTheGridForm.getByRole('radio', { name: "Option 2" }).check({ force: true })

        //validating when the option 2 was selected option1 was deselected

        // you should provide the entire locator as an arguement

        expect(await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy
        expect(await usingTheGridForm.getByRole('radio', { name: "Option 2" }).isChecked()).toBeTruthy

    })





})

//if the test is in the different page we created the test outside of the describe block

test('checkboxes', async ({ page }) => {  //click comment doesnt validate the sattus of the cehckbox if it is already checked it doesn unclick

    await page.getByText('Modal & Overlays').click()

    await page.getByText('Toastr').click()

    //await page.getByRole('checkbox',{name:'Hide on Click'}).click({force:true})

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })

    await page.getByRole('checkbox', { name: 'Hide on Click' }).check({ force: true })


    //select of the all checkboxes and uncheck them 

    const allBoxes = page.getByRole('checkbox', { name: 'Hide on Click' })

    //first we need to convert them in to arry sing all()

    for (const box of await allBoxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy

    }







})


test('list and dropdowns', async ({ page }) => {

    const dropdownMenu = page.locator('ngx-header nb-select ')

    dropdownMenu.click()

    page.getByRole('list') // when the list has a UL tag

    page.getByRole('listitem') // when the list has a LI tag

    //const optionList = page.getByRole('list').locator('nb-option')

    const optionList = await page.locator('nb-option-list nb-option') //list of array 
    // we presented list of array so we need to use array 
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    await optionList.filter({ hasText: "Cosmic" }).click()



    //verify the background clolor of the selcted option
    //first right click inspect anyweher on the page 
    // then find the parent element and check the style title from the right column and look ofr the nb-layout-header scrolling down 
    //it has a property bacground color: click and check rgb ()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')




    // retrive all the colors

    const colors = {

        "Light": 'rgb(255, 255, 255)',
        "Dark": 'rgb(34, 43, 69)',
        "Cosmic": 'rgb(50, 50, 89)',
        "Corporate": 'rgb(255, 255, 255)'



    }

    //while we loop through we will use for in time because these are objects

    await dropdownMenu.click()
    for (const color in colors) {

        await optionList.filter({ hasText: color }).click()

        await expect(header).toHaveCSS('background-color', colors[color])

        if (color != "Corporate") {
            await dropdownMenu.click()
        }




    }

})



test('toolTips', async ({ page }) => {

    //command + backslash (mack)
    //f8 in windows to freeze the browser


    await page.getByText('Modal & Overlays').click()

    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card').filter({ hasText: "Tooltip Placements" })

    await toolTipCard.getByRole('button', { name: "Top" }).hover()


    page.getByRole('tooltip')//if you have a role tooltip created 
    const tooltip = await page.locator('nb-tooltip').textContent()

    expect(tooltip).toEqual('This is a tooltip')

})


test('dialog box', async ({ page }) => {
    await page.getByText('Tables & Data').click()

    await page.getByText('Smart Table').click()
    // browser dialog boxes we neet to call page listener

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')




})



test('web tables', async ({ page }) => {

    // 1 get the first row and change the email
    await page.getByText('Tables & Data').click()

    await page.getByText('Smart Table').click()
    // but mail can be displayed as an attribute so tis might not work keep in mind
    //  const targetRow=  page.getByRole('row',{name:'twitter@outlook.com'})
    //await targetRow.locator('.nb-edit').click()

    /*await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('39')
   
   
    const checkMark = page.locator('.nb-checkmark')
   
    await checkMark.click()*/



    //2 get the row based on the value in the specific column
    const targetPage = page.locator('.ng2-smart-pagination-nav').getByText('2')

    await targetPage.click()


    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText("11") })

    await targetRowById.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('esraTest@gmail.com')
    const checkMark = page.locator('.nb-checkmark')
    await checkMark.click()

    await expect(targetRowById.locator('td').nth(5)).toHaveText('esraTest@gmail.com')

    //3 test filter of the table

    const ages = ["20", "30", "40", "200"]



    for (let age of ages) {

        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)

        //playwright is faster we need to create a delay 


        const ageRows = page.locator('tbody tr')
        // we will get a cell value for each of the row 

        await page.waitForTimeout(5000)
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()   //last is the last value
            if (age == "200") {

                expect(await page.getByRole('table').textContent()).toContain(' No data found ')
            } else {
                await expect(cellValue).toEqual(age)
            }

        }

    }




})



test('datePicker', async ({ page }) => {


    await page.getByText('Forms').click()

    await page.getByText('Datepicker').click()

    const calenderInput = page.getByPlaceholder('Form Picker')

    await calenderInput.click()

    //selct all the date of the month 
    //{exact:true} method will search the eaxactly the number 1 not the contained valeus 

    ///js date for documentation 
    let date = new Date()

    date.setDate(date.getDate() + 200)

    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {

        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"] ').click()

        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()



    }


    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()

    await expect(calenderInput).toHaveValue(dateToAssert)



})

test('sliders', async ({ page }) => {
   /* const circle = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    await circle.evaluate(node => {


        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')



    })
    await circle.click()*/

    //Mouse movement 

    const circleBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    //we neet to locate all view of the movement of the cicrcle 
    await circleBox.scrollIntoViewIfNeeded()

    // we need to define bounding box which cordinates the whole angle(x=0,y=0) 

    const box = await circleBox.boundingBox()

    // we need to find the centre of the box as a starting point 
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    await page.mouse.move(x, y) // I put the mouse at the centre
    await page.mouse.down() // I want to move the cursor an it clicked to move the cursor at the centre
    await page.mouse.move(x + 100, y) // moved the curor right horizontally but the y stayed the same 
    await page.mouse.move(x + 100, y + 100) // we kept the horizontal with the same value and updated the y to move down 100 pixel
    await page.mouse.up() // we released the mouse 
})



