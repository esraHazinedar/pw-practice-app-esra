import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();


export default defineConfig<TestOptions>({
  timeout: 10000,
 // globalTimeout:60000,// this for the all po

  expect:{
    timeout:2000 //we can golabbly configure the time out 
  },
 
 
 
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
        token: "argos_44ad6eb4d0720632f193edaed56833f88b",
       
      },
    ],
  
  ['html']
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    globalsQURL :'https://www.globalsqa.com/demo-site/draganddrop/',
  //  baseURL: 'http://localhost:4200/',
   
     baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
           : process.env.STAGING =='1' ?'http://localhost:4202/'
           :'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    actionTimeout: 5000,
    navigationTimeout:5000,
    video:{
     mode: 'off' ,
     size:{width:1920, height:1080}// we can record the tests when the tests failed but to record we need to run the tests in the terminal

  },
  },

  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'] ,
      
      },
      
      //fullyParallel: true you can run the project only for chrome in parallel
    },
    {
      name: 'chromium',
      
      //fullyParallel: true you can run the project only for chrome in parallel
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' }
    },
    {
      name: 'mobile',
      testMatch: ['**/testMobile.spec.ts'],

      use:{
        ...devices['Pixel 5'],
        viewport: { width: 400, height: 800 },
      }
    }
  ],
  webServer :{
    command: 'npm run start',
    url:'http://localhost:4200/',
    reuseExistingServer: true,
  }
    
   

   
});
