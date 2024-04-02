// Import puppeteer
import puppeteer from 'puppeteer';
const RootAdmin = {
  userName: 'ROOT_ADMIN1',
  password: 'Anurag@123',
  otp: Math.floor(100000 + Math.random() * 900000).toString() // Generate random OTP
};

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 5,
    // devtools:true
    defaultViewport: null,

  });
  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('http://localhost:3000/');

  const title = await page.title();
  console.log("title", title);

  // Click on the element
  const element = await page.waitForSelector('.ROOT_ADMIN');
  await element.click();
  // Input username and password
  await page.click('.loginUsername');

  await page.type('.loginUsername', RootAdmin.userName);
  await page.click('.loginPassword');

  await page.type('.loginPassword', RootAdmin.password);

  // Click on the submit button to send OTP
  await page.click('.loginButton');

  // Wait for OTP field to appear
  await page.waitForSelector('.otpFiller');

  await page.type('.otpFiller', RootAdmin.otp);

  // Click on the verify OTP button
  await page.click('.verifyOtpButton');
  // Wait for navigation to complete to the dashboard
  await page.waitForNavigation();

  // // // You can further interact with the dashboard page here
  // // await page.waitForSelector('.updateOrgAdminButton');
  // // await page.click('.updateOrgAdminButton');
  // // // Click on the "Approve" menu item
  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // });
  
  // // Wait for the last row to become visible
  // await page.waitForSelector('.dataGridRow:last-child');
  
  // // Click on the last row to open its menu
  // await page.click('.dataGridRow:last-child');

  // await page.click('.userOptionMenu'); // Assuming '.userOptionMenu' is the class of the menu container
  // await page.waitForSelector('.userOptionMenu'); // Wait for the menu to appear
  // await page.click('.userOptionMenu MenuItem'); // Click on the first menu item

})();
