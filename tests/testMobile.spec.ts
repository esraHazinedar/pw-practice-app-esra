import { test, expect } from '@playwright/test';



test('input fields', async ({ page }, testInfo) => {

        await page.goto('/')
        if(testInfo.project.name=='mobile'){
                await page.locator('.sidebar-toggle').click()

        }
        
        // await page.waitForTimeout(3000); // then try clicking
        await page.getByText('Forms').click();
        await page.waitForTimeout(3000);
        await page.getByText('Form Layouts').click();

        await page.locator('.sidebar-toggle').click()


        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
        await page.waitForTimeout(3000);
        await usingTheGridEmailInput.fill('test@gmail.com')



        await usingTheGridEmailInput.clear()


        await usingTheGridEmailInput.fill('test2@gmail.com') //stimulate key strokes with delays with the strokes


})



