import { test } from '../test-options'; // we will ge the precodition from our fixture so we entend this fixture and give an argument to the test check the test
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'




// now we extednde the fizture page so we can delete the before eack step and comment out the step:  await pm.navigateTo.formLayOutsPage()
//after removing the arguement we can run the test by giving array condition in the fixturewith an option true
test('parameterized methods', async ({ pageManager}) => {

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}.@test.com`
    console.log(randomFullName)


    await pageManager.onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSElectionOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutPage.submitInLİneFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)



})

/**
 * NPM TERMİNAL COMMENTS
npx playwright test usePageObjects.spec.ts --project=chromium

we candle these comments by placing them in package.json() file
1.packake.json() file
2.  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "pageObjects-chrome":"npx playwright test usePageObjects.spec.ts --project=chromium"
     "pageObjects-firefox":"npx playwright test usePageObjects.spec.ts --project=firefox"
  },


  3.first npm run then type in terminal:npm run pageObjects-chrome
  4. I can change the browser : navigate to form page 
 */