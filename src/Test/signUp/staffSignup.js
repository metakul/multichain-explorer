/* eslint-disable no-undef */
import puppeteer from 'puppeteer';

// Function to generate random phone number

(async () => {
    let brahmaId;
    let mobileNo;
    let mailId

    process.argv.forEach((arg) => {
        if (arg.startsWith('brahmaId:')) {
            brahmaId = arg.split(':')[1];
        }
        if (arg.startsWith('mobileNo:')) {
          mobileNo = arg.split(':')[1];
        }
        if (arg.startsWith('mailId:')) {
          mailId = arg.split(':')[1];
        }
    });
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 5,
        defaultViewport: null,
        devtools:true
    });

    const page = await browser.newPage();

    await page.goto('http://localhost:3000/staff/signup');

    const staffTypeSelector = '.laboratory input[type="radio"]';
    await page.waitForSelector(staffTypeSelector, { visible: true });

    // Click on the ORGANISATION r9359943998adio button
    await page.click(staffTypeSelector);

    await page.type('#brahmaId', brahmaId);
    await page.type('#mobileNo', mobileNo);
    await page.type('#password-signup', 'Anurag@123');
    await page.type('#mailId', mailId);

    await page.type('#confirmPassword', 'Anurag@123');
    await page.type('#department', 'eye');
    // await page.type('#hospitalId', 'H0001');
    await page.type('#appointment', 'appointment');

    await page.click('.handleNext')

    const otpVerificationSelector = '.verifyByEmail input[type="radio"]';
    await page.waitForSelector(otpVerificationSelector, { visible: true });

    // Click on the ORGANISATION radio button
    await page.click(otpVerificationSelector);

    await page.click('button[type="submit"]');

        // Wait for OTP field to appear
        await page.waitForSelector('.otpFiller');

        await page.type('.otpFiller', "124557");
    
    // Click on the verify OTP button
    await page.click('.verifyOtpButton');
})();
