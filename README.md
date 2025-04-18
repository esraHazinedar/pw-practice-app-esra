### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin


NPM TERMİNAL COMMENTS
npx playwright test usePageObjects.spec.ts --project=chromium

we candle these comments by placing them in package.json() file
1.packake.json() file
2.  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "pageObjects-chrome":"npx playwright test usePageObjects.spec.ts --project=chromium"
     "pageObjects-firefox":"npx playwright test usePageObjects.spec.ts --project=firefox",
      "pageObjects-all": "npm run pageObjects-chrome && npm run pageObjects-firefox"
  },
&&: this means it will run sequentially 
& if I use single it means both will run parallely 

  3.first npm run then type in terminal:npm run pageObjects-chrome
  4. to run all of then npm run pageObjects-all 


  we can use Fake.js to create fake data to install the libarary:
  for this in terminal : npm i @faker-js/faker --save-dev --force
  now it was added into the framework
  we need to import it into our class
import {faker} from '@faker-js/faker'