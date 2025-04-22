import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app-esra/page-objects/pageManager';
export type TestOptions = {
    globalsQURL: string
    formLayoutsPage: string
    pageManager: PageManager
}


export const test = base.extend<TestOptions>({
//if we place array before and give a condition fixture will be initialized before the browser open and this will increase the execution speed
    globalsQURL: [,{option:true}],
    //we created the fixture which is a preconditon for our test to run
    formLayoutsPage:async({page},use)=>{
        await page.goto('/')
        await page.getByText('Forms').click() //it means we use this page instance to be passed from 
        
        await page.getByText('Form Layouts').click()
        await use('') // we use empty cause we will not use this for any values
        //if ı type after use() it will be ateardown
        console.log('Teardown')
    },

    pageManager: async({page,formLayoutsPage},use)=>{  // we created the dependency betweeen thetwo fixtures firrst the formlayout will be triggreed to initilaize later the pageManger 
      const pm = new PageManager(page)
      await use(pm)
    }


})