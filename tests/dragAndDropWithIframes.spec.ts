import { test, expect } from '@playwright/test'

test ('drag and drop with iframe',async({page},testInfo)=>{

await page.goto("https://www.globalsqa.com/demo-site/draganddrop")

const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe')


await iframe.locator('li',{hasText:'High Tatras 2'}).dragTo(iframe.locator('#trash'))

//more precise control

await iframe.locator('li',{hasText:'High Tatras 4'}).hover()

await page.mouse.down() //in order to click right above this element

await iframe.locator('#trash').hover() // move the mouse to the direction where e want to move the elemnt

await page.mouse.up() // we release the mouse 

await expect(iframe.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 4"])


})
