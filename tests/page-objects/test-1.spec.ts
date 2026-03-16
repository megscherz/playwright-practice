import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
    // launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // click on Make Appointment
    await page.getByRole('link', {name: 'Make Appointment'}).click();
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');

    // login
    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', {name: 'Login'}).click();
    
    // Assert a text
    await expect(page.locator('h2')).toContainText('Make Appointment');
});