import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();


export default defineConfig<TestOptions>({
 
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    globalsQURL :'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',
   

  },

  projects: [
    
    {
      name: 'chromium',
      
      //fullyParallel: true you can run the project only for chrome in parallel
    },

  
  ]
    
   

   
});
