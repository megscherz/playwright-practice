import{ test, expect } from '@playwright/test'

test('should load home page with correct title', async ({page}) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    await expect(page).toHaveTitle('CURA Healthcare Service')
    expect(page.locator('//h1')).toHaveText('CURA Healthcare Service')
})

//*[@id="top"]/div/h1